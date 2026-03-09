"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  Checkbox,
  Button,
  Chip,
  cn,
  SearchField,
  Description,
  Pagination,
  Label,
  Input,
  TextArea,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Toast,
  toast,
} from "@heroui/react";
import { CircleCheck, Plus, SaveAllIcon, X } from "lucide-react";
import { FaEye, FaPencilAlt, FaTrash, FaDollarSign, FaTags, FaVideo } from "react-icons/fa";
import useCourseStore from "../../store/CourseStore";
import useCategoryStore from "../../store/CategoryStore";
import { CldUploadWidget } from "next-cloudinary";

const statusColorMap = { Active: "success", Inactive: "danger", Upcoming: "warning" };
const ROWS_PER_PAGE = 3;

// ─── Reusable centered popover ────────────────────────────────────────────────
function CenterPopover({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="z-[9999] w-[500px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

// ─── Sortable column header ────────────────────────────────────────────────────
function SortableColumnHeader({ children, sortDirection }) {
  return (
    <span className="flex items-center justify-between">
      {children}
      {sortDirection && (
        <span className={cn("size-3 inline-block transform transition-transform duration-100 ease-out", sortDirection === "descending" ? "rotate-180" : "")}>▲</span>
      )}
    </span>
  );
}

// ─── Shared course form fields ─────────────────────────────────────────────────
function CourseFormFields({ defaults = {}, thumbnail, setThumbnail, categories = [] }) {
  return (
    <div className="flex flex-col gap-3">
      <Input name="courseName" variant="secondary" placeholder="কোর্সের নাম" required leading={<FaTags />} defaultValue={defaults.title || ""} />
      <Input name="author" variant="secondary" placeholder="Author নাম" required leading={<FaTags />} defaultValue={defaults.author || ""} />
      <Input name="currentPrice" variant="secondary" type="number" placeholder="বর্তমান মূল্য ($)" required leading={<FaDollarSign />} defaultValue={defaults.price ?? ""} />
      <Input name="regularPrice" variant="secondary" type="number" placeholder="নিয়মিত মূল্য ($)" leading={<FaDollarSign />} defaultValue={defaults.regularPrice ?? ""} />
      <Input name="introVideo" variant="secondary" type="url" placeholder="ইন্ট্রো ভিডিও URL" leading={<FaVideo />} defaultValue={defaults.introVideo || ""} />

      <div className="flex flex-col gap-2">
        <Label>Course Thumbnail</Label>
        <CldUploadWidget uploadPreset="shatadhru" onSuccess={(result) => { setThumbnail(result.info.secure_url); toast("Image uploaded!"); }}>
          {({ open }) => (
            <div className="flex flex-col gap-2">
              <Button type="button" variant="secondary" className="w-full flex items-center justify-center gap-2" onPress={() => open()}>
                Upload Thumbnail
              </Button>
              {(thumbnail || defaults.image) && (
                <div className="flex items-center gap-2">
                  <img src={thumbnail || "/logo2.png"} alt="Thumbnail" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                  <span className="text-xs text-green-600 flex items-center gap-1"><CircleCheck size={14} /> {thumbnail ? "New upload" : "Current"}</span>
                </div>
              )}
            </div>
          )}
        </CldUploadWidget>
      </div>

      <TextArea name="description" variant="secondary" placeholder="কোর্সের বিস্তারিত বিবরণ লিখুন..." rows={3} required defaultValue={defaults.description || ""} />

      {/* Status only shown when editing */}
      {defaults.status !== undefined && (
        <div className="flex flex-col gap-2">
          <Label>Status</Label>
          <RadioGroup variant="secondary" defaultValue={defaults.status} name="status" orientation="horizontal">
            {["Active", "Inactive", "Upcoming"].map((s) => (
              <Radio key={s} value={s}>
                <Radio.Control><Radio.Indicator /></Radio.Control>
                <Radio.Content><Label>{s}</Label></Radio.Content>
              </Radio>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label>Visibility</Label>
        <RadioGroup variant="secondary" defaultValue={defaults.visibility || "public"} name="plan-orientation" orientation="horizontal">
          {["public", "password-protected", "private"].map((val) => (
            <Radio key={val} value={val}>
              <Radio.Control><Radio.Indicator /></Radio.Control>
              <Radio.Content><Label>{val.replace("-", " ").toUpperCase()}</Label></Radio.Content>
            </Radio>
          ))}
        </RadioGroup>
      </div>

      <CheckboxGroup variant="sec" name="categories" className="flex flex-col gap-2" defaultValue={defaults.categories || []}>
        <Label>Categories</Label>
        <Description>Choose all that apply</Description>
        <div className="flex gap-2 flex-wrap">
          {categories.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No categories found. Add some from the Categories page.</p>
          ) : (
            categories.map((cat) => (
              <Checkbox key={cat._id} value={cat.slug}>
                <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
                <Checkbox.Content><Label>{cat.name}</Label></Checkbox.Content>
              </Checkbox>
            ))
          )}
        </div>
      </CheckboxGroup>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function CourseTableJS() {
  const courses      = useCourseStore((s) => s.courses);
  const addCourse    = useCourseStore((s) => s.addCourse);
  const updateCourse = useCourseStore((s) => s.updateCourse);
  const removeCourse  = useCourseStore((s) => s.removeCourse);
  const removeCourses = useCourseStore((s) => s.removeCourses);
  const fetchCourses  = useCourseStore((s) => s.fetchCourses);

  // ── Live categories from CategoryStore ──────────────────────────────────────
  const categories     = useCategoryStore((s) => s.categories);
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);

  const [selectedKeys, setSelectedKeys]     = useState(new Set());
  const [sortDescriptor, setSortDescriptor] = useState({ column: "title", direction: "ascending" });
  const [page, setPage]                     = useState(1);
  const [searchQuery, setSearchQuery]       = useState("");

  // Popover states
  const [isCreateOpen, setIsCreateOpen]       = useState(false);
  const [createThumbnail, setCreateThumbnail] = useState("");
  const [viewCourse, setViewCourse]           = useState(null);
  const [editCourse, setEditCourse]           = useState(null);
  const [editThumbnail, setEditThumbnail]     = useState("");
  const [deleteCourse, setDeleteCourse]       = useState(null);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);
  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const filteredCourses = useMemo(() =>
    courses.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.author.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery, courses]);

  const sortedCourses = useMemo(() =>
    [...filteredCourses].sort((a, b) => {
      const col = sortDescriptor.column;
      let cmp = String(a[col] || "").localeCompare(String(b[col] || ""));
      if (sortDescriptor.direction === "descending") cmp *= -1;
      return cmp;
    }), [filteredCourses, sortDescriptor]);

  const paginatedCourses = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return sortedCourses.slice(start, start + ROWS_PER_PAGE);
  }, [page, sortedCourses]);

  const totalPages = Math.ceil(filteredCourses.length / ROWS_PER_PAGE);
  const pages      = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem  = (page - 1) * ROWS_PER_PAGE + 1;
  const endItem    = Math.min(page * ROWS_PER_PAGE, filteredCourses.length);

  // ── Helper: resolve category slug → name for display ────────────────────────
  const resolveCategoryName = (slug) => {
    const found = categories.find((c) => c.slug === slug);
    return found ? found.name : slug;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await addCourse({
      title: fd.get("courseName"),
      image: createThumbnail,
      author: fd.get("author"),
      description: fd.get("description"),
      price: parseFloat(fd.get("currentPrice") || 0),
      regularPrice: parseFloat(fd.get("regularPrice") || 0),
      introVideo: fd.get("introVideo") || "",
      status: "Upcoming",
      categories: fd.getAll("categories"),
      visibility: fd.get("plan-orientation") || "public",
    });
    setIsCreateOpen(false);
    setCreateThumbnail("");
    toast("কোর্স সফলভাবে যুক্ত হয়েছে!");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await updateCourse(editCourse._id, {
      title: fd.get("courseName"),
      image: editThumbnail || editCourse.image,
      author: fd.get("author"),
      description: fd.get("description"),
      price: parseFloat(fd.get("currentPrice") || 0),
      regularPrice: parseFloat(fd.get("regularPrice") || 0),
      introVideo: fd.get("introVideo") || "",
      status: fd.get("status") || editCourse.status,
      categories: fd.getAll("categories"),
      visibility: fd.get("plan-orientation") || editCourse.visibility,
    });
    setEditCourse(null);
    setEditThumbnail("");
    toast("কোর্স আপডেট হয়েছে!");
  };

  const handleBulkDelete = async () => {
    await removeCourses(Array.from(selectedKeys));
    setSelectedKeys(new Set());
    toast("Selected courses deleted!");
  };

  const handleConfirmDelete = async () => {
    await removeCourse(deleteCourse._id);
    setDeleteCourse(null);
    toast("Course deleted successfully!");
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold text-accent mb-2">কোর্স তালিকা</h1>
      <p className="text-gray-600 mb-4">আপনার সকল কোর্স ও লাইভ ক্লাস ম্যানেজ করুন।</p>

      {/* Search + Add */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <SearchField name="search" value={searchQuery} onChange={setSearchQuery}>
          <Label>Search Courses</Label>
          <SearchField.Group>
            <SearchField.Input className="w-[280px]" placeholder="Search by title, author, or description..." />
            <SearchField.ClearButton />
          </SearchField.Group>
          <Description>{filteredCourses.length} course(s) found</Description>
        </SearchField>
        <Button className="flex items-center gap-1" onPress={() => { setIsCreateOpen(true); setCreateThumbnail(""); }}>
          <Plus /> কোর্স যুক্ত করুন
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedKeys.size > 0 && (
        <div className="mb-2 flex gap-2">
          <Button variant="danger-soft" onPress={handleBulkDelete}>Delete Selected</Button>
          <Button variant="secondary" onPress={() => setSelectedKeys(new Set())}>Clear Selection</Button>
        </div>
      )}

      {/* Table */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Course table" className="min-w-[1000px]"
            selectedKeys={selectedKeys} selectionMode="multiple"
            onSelectionChange={setSelectedKeys}
            sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}
          >
            <Table.Header>
              <Table.Column>Image</Table.Column>
              <Table.Column className="pr-0">
                <Checkbox aria-label="Select all" slot="selection">
                  <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
                </Checkbox>
              </Table.Column>
              <Table.Column allowsSorting id="_id">
                {({ sortDirection }) => <SortableColumnHeader sortDirection={sortDirection}>ID</SortableColumnHeader>}
              </Table.Column>
              <Table.Column allowsSorting id="title">
                {({ sortDirection }) => <SortableColumnHeader sortDirection={sortDirection}>Title</SortableColumnHeader>}
              </Table.Column>
              <Table.Column allowsSorting id="author">
                {({ sortDirection }) => <SortableColumnHeader sortDirection={sortDirection}>Author</SortableColumnHeader>}
              </Table.Column>
              <Table.Column allowsSorting id="price">
                {({ sortDirection }) => <SortableColumnHeader sortDirection={sortDirection}>Price ($)</SortableColumnHeader>}
              </Table.Column>
              <Table.Column>Description</Table.Column>
              <Table.Column allowsSorting id="status">
                {({ sortDirection }) => <SortableColumnHeader sortDirection={sortDirection}>Status</SortableColumnHeader>}
              </Table.Column>
              <Table.Column>Categories</Table.Column>
              <Table.Column>More Info</Table.Column>
              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {paginatedCourses.map((course) => (
                <Table.Row key={course._id} id={course._id}>
                  <Table.Cell>
                    <img src={course.image ||"/logo2.png"}  alt={course.title} className="w-16 h-16 object-cover rounded" />
                  </Table.Cell>
                  <Table.Cell className="pr-0">
                    <Checkbox aria-label={`Select ${course.title}`} slot="selection" variant="secondary">
                      <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
                    </Checkbox>
                  </Table.Cell>
                  <Table.Cell>{course._id}</Table.Cell>
                  <Table.Cell>{course.title}</Table.Cell>
                  <Table.Cell>{course.author}</Table.Cell>
                  <Table.Cell>${course.price}</Table.Cell>
                  <Table.Cell>{course.description}</Table.Cell>
                  <Table.Cell>
                    <Chip color={statusColorMap[course.status]} size="sm" variant="soft">{course.status}</Chip>
                  </Table.Cell>
                  {/* ── Live category name chips ── */}
                  <Table.Cell>
                    <div className="flex gap-1 flex-wrap">
                      {course.categories?.length > 0
                        ? course.categories.map((slug) => (
                            <Chip key={slug} size="sm" variant="flat">
                              {resolveCategoryName(slug)}
                            </Chip>
                          ))
                        : <span className="text-xs text-gray-400">—</span>
                      }
                    </div>
                  </Table.Cell>
                  <Table.Cell>{course.moreInfo}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-1 justify-end">
                      <Button isIconOnly size="sm" variant="tertiary" onPress={() => setViewCourse(course)}>
                        <FaEye className="size-4" />
                      </Button>
                      <Button isIconOnly size="sm" variant="tertiary" onPress={() => { setEditCourse(course); setEditThumbnail(""); }}>
                        <FaPencilAlt className="size-4" />
                      </Button>
                      <Button isIconOnly size="sm" variant="danger-soft" onPress={() => setDeleteCourse(course)}>
                        <FaTrash className="size-4" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <Pagination size="sm">
            <Pagination.Summary>{startItem} to {endItem} of {filteredCourses.length} results</Pagination.Summary>
            <Pagination.Content>
              <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => Math.max(1, p - 1))}>Prev</Pagination.Previous>
              {pages.map((p) => (
                <Pagination.Link key={p} isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link>
              ))}
              <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Pagination.Next>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>

      {/* ── CREATE ── */}
      <CenterPopover isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="নতুন কোর্স তৈরি করুন">
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          <CourseFormFields
            thumbnail={createThumbnail}
            setThumbnail={setCreateThumbnail}
            categories={categories}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button type="submit" className="flex items-center gap-2"><SaveAllIcon /> সংরক্ষণ করুন</Button>
            <Button type="button" variant="secondary" onPress={() => setIsCreateOpen(false)}>বাতিল</Button>
          </div>
        </form>
      </CenterPopover>

      {/* ── VIEW ── */}
      <CenterPopover isOpen={!!viewCourse} onClose={() => setViewCourse(null)} title="কোর্স বিবরণ">
        {viewCourse && (
          <div className="flex flex-col gap-4">
            {viewCourse.image && (
              <img src={viewCourse.image || "/logo2.png"}  alt={viewCourse.title} className="w-full h-48 object-cover rounded-xl border border-gray-100" />
            )}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-400 block text-xs mb-0.5">Title</span><span className="font-medium text-gray-800 dark:text-gray-100">{viewCourse.title}</span></div>
              <div><span className="text-gray-400 block text-xs mb-0.5">Author</span><span className="font-medium text-gray-800 dark:text-gray-100">{viewCourse.author}</span></div>
              <div><span className="text-gray-400 block text-xs mb-0.5">Price</span><span className="font-medium text-gray-800 dark:text-gray-100">${viewCourse.price}</span></div>
              <div><span className="text-gray-400 block text-xs mb-0.5">Regular Price</span><span className="font-medium text-gray-800 dark:text-gray-100">${viewCourse.regularPrice}</span></div>
              <div><span className="text-gray-400 block text-xs mb-0.5">Status</span><Chip color={statusColorMap[viewCourse.status]} size="sm" variant="soft">{viewCourse.status}</Chip></div>
              <div><span className="text-gray-400 block text-xs mb-0.5">Visibility</span><span className="font-medium text-gray-800 dark:text-gray-100 capitalize">{viewCourse.visibility}</span></div>
              {viewCourse.categories?.length > 0 && (
                <div className="col-span-2">
                  <span className="text-gray-400 block text-xs mb-0.5">Categories</span>
                  <div className="flex gap-1 flex-wrap">
                    {viewCourse.categories.map((slug) => (
                      <Chip key={slug} size="sm" variant="soft">{resolveCategoryName(slug)}</Chip>
                    ))}
                  </div>
                </div>
              )}
              {viewCourse.introVideo && (
                <div className="col-span-2">
                  <span className="text-gray-400 block text-xs mb-0.5">Intro Video</span>
                  <a href={viewCourse.introVideo} target="_blank" rel="noreferrer" className="text-blue-500 underline text-xs break-all">{viewCourse.introVideo}</a>
                </div>
              )}
              <div className="col-span-2"><span className="text-gray-400 block text-xs mb-0.5">Description</span><p className="text-gray-700 dark:text-gray-300">{viewCourse.description}</p></div>
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" onPress={() => setViewCourse(null)}>বন্ধ করুন</Button>
            </div>
          </div>
        )}
      </CenterPopover>

      {/* ── EDIT ── */}
      <CenterPopover isOpen={!!editCourse} onClose={() => setEditCourse(null)} title="কোর্স সম্পাদনা করুন">
        {editCourse && (
          <form onSubmit={handleEdit} className="flex flex-col gap-3">
            <CourseFormFields
              defaults={editCourse}
              thumbnail={editThumbnail}
              setThumbnail={setEditThumbnail}
              categories={categories}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button type="submit" className="flex items-center gap-2"><SaveAllIcon /> আপডেট করুন</Button>
              <Button type="button" variant="secondary" onPress={() => setEditCourse(null)}>বাতিল</Button>
            </div>
          </form>
        )}
      </CenterPopover>

      {/* ── DELETE ── */}
      <CenterPopover isOpen={!!deleteCourse} onClose={() => setDeleteCourse(null)} title="কোর্স মুছুন">
        {deleteCourse && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
              {deleteCourse.image && (
                <img src={deleteCourse.image || "/logo2.png"}  alt={deleteCourse.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
              )}
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{deleteCourse.title}</p>
                <p className="text-sm text-gray-500">{deleteCourse.author}</p>
                {deleteCourse.categories?.length > 0 && (
                  <div className="flex gap-1 flex-wrap mt-1">
                    {deleteCourse.categories.map((slug) => (
                      <Chip key={slug} size="sm" variant="flat">{resolveCategoryName(slug)}</Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">আপনি কি নিশ্চিত যে আপনি এই কোর্সটি স্থায়ীভাবে মুছে ফেলতে চান? এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।</p>
            <div className="flex justify-end gap-2">
              <Button variant="danger" onPress={handleConfirmDelete}>হ্যাঁ, মুছুন</Button>
              <Button variant="secondary" onPress={() => setDeleteCourse(null)}>বাতিল</Button>
            </div>
          </div>
        )}
      </CenterPopover>

      <Toast.Provider placement="top end" />
    </div>
  );
}