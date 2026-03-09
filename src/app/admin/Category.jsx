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
  Toast,
  toast,
} from "@heroui/react";
import { Plus, SaveAllIcon, X, Hash, FileText, Eye } from "lucide-react";
import { FaEye, FaPencilAlt, FaTrash, FaTags } from "react-icons/fa";
import useCategoryStore from "../../store/CategoryStore";
import { CldUploadWidget } from "next-cloudinary";
import { CircleCheck } from "lucide-react";

const statusColorMap = { Active: "success", Inactive: "danger" };
const ROWS_PER_PAGE = 5;

// ─── Reusable centered popover ────────────────────────────────────────────────
function CenterPopover({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="z-[9999] w-[480px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl">
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

// ─── Shared category form fields ───────────────────────────────────────────────
function CategoryFormFields({ defaults = {}, thumbnail, setThumbnail }) {
  return (
    <div className="flex flex-col gap-3">
      <Input
        name="name"
        variant="secondary"
        placeholder="ক্যাটাগরির নাম"
        required
        leading={<FaTags />}
        defaultValue={defaults.name || ""}
      />
      <Input
        name="slug"
        variant="secondary"
        placeholder="slug (e.g. ssc-26)"
        required
        leading={<Hash size={14} />}
        defaultValue={defaults.slug || ""}
      />
      <TextArea
        name="description"
        variant="secondary"
        placeholder="ক্যাটাগরির বিবরণ লিখুন..."
        rows={3}
        defaultValue={defaults.description || ""}
      />

      {/* Thumbnail */}
      <div className="flex flex-col gap-2">
        <Label>Category Image</Label>
        <CldUploadWidget
          uploadPreset="shatadhru"
          onSuccess={(result) => { setThumbnail(result.info.secure_url); toast("Image uploaded!"); }}
        >
          {({ open }) => (
            <div className="flex flex-col gap-2">
              <Button type="button" variant="secondary" className="w-full flex items-center justify-center gap-2" onPress={() => open()}>
                Upload Image
              </Button>
              {(thumbnail || defaults.image) && (
                <div className="flex items-center gap-2">
                  <img src={thumbnail || defaults.image} alt="Category" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CircleCheck size={14} /> {thumbnail ? "New upload" : "Current"}
                  </span>
                </div>
              )}
            </div>
          )}
        </CldUploadWidget>
      </div>

      {/* Status — only shown when editing */}
      {defaults.status !== undefined && (
        <div className="flex flex-col gap-2">
          <Label>Status</Label>
          <RadioGroup variant="secondary" defaultValue={defaults.status || "Active"} name="status" orientation="horizontal">
            {["Active", "Inactive"].map((s) => (
              <Radio key={s} value={s}>
                <Radio.Control><Radio.Indicator /></Radio.Control>
                <Radio.Content><Label>{s}</Label></Radio.Content>
              </Radio>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function CategoryTable() {
  const categories     = useCategoryStore((s) => s.categories);
  const addCategory    = useCategoryStore((s) => s.addCategory);
  const updateCategory = useCategoryStore((s) => s.updateCategory);
  const removeCategory  = useCategoryStore((s) => s.removeCategory);
  const removeCategories = useCategoryStore((s) => s.removeCategories);
  const fetchCategories  = useCategoryStore((s) => s.fetchCategories);

  const [selectedKeys, setSelectedKeys]     = useState(new Set());
  const [sortDescriptor, setSortDescriptor] = useState({ column: "name", direction: "ascending" });
  const [page, setPage]           = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Popover states
  const [isCreateOpen, setIsCreateOpen]       = useState(false);
  const [createThumbnail, setCreateThumbnail] = useState("");
  const [viewCategory, setViewCategory]       = useState(null);
  const [editCategory, setEditCategory]       = useState(null);
  const [editThumbnail, setEditThumbnail]     = useState("");
  const [deleteCategory, setDeleteCategory]   = useState(null);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const filteredCategories = useMemo(() =>
    categories.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.slug || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description || "").toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery, categories]);

  const sortedCategories = useMemo(() =>
    [...filteredCategories].sort((a, b) => {
      const col = sortDescriptor.column;
      let cmp = String(a[col] || "").localeCompare(String(b[col] || ""));
      if (sortDescriptor.direction === "descending") cmp *= -1;
      return cmp;
    }), [filteredCategories, sortDescriptor]);

  const paginatedCategories = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return sortedCategories.slice(start, start + ROWS_PER_PAGE);
  }, [page, sortedCategories]);

  const totalPages = Math.ceil(filteredCategories.length / ROWS_PER_PAGE);
  const pages      = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem  = (page - 1) * ROWS_PER_PAGE + 1;
  const endItem    = Math.min(page * ROWS_PER_PAGE, filteredCategories.length);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await addCategory({
      name: fd.get("name"),
      slug: fd.get("slug"),
      description: fd.get("description") || "",
      image: createThumbnail,
      status: "Active",
    });
    setIsCreateOpen(false);
    setCreateThumbnail("");
    toast("ক্যাটাগরি সফলভাবে যুক্ত হয়েছে!");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await updateCategory(editCategory._id, {
      name: fd.get("name"),
      slug: fd.get("slug"),
      description: fd.get("description") || "",
      image: editThumbnail || editCategory.image,
      status: fd.get("status") || editCategory.status,
    });
    setEditCategory(null);
    setEditThumbnail("");
    toast("ক্যাটাগরি আপডেট হয়েছে!");
  };

  const handleBulkDelete = async () => {
    await removeCategories(Array.from(selectedKeys));
    setSelectedKeys(new Set());
    toast("Selected categories deleted!");
  };

  const handleConfirmDelete = async () => {
    await removeCategory(deleteCategory._id);
    setDeleteCategory(null);
    toast("Category deleted successfully!");
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold text-accent mb-2">ক্যাটাগরি তালিকা</h1>
      <p className="text-gray-600 mb-4">আপনার সকল ক্যাটাগরি ম্যানেজ করুন।</p>

      {/* Search + Add */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <SearchField name="search" value={searchQuery} onChange={setSearchQuery}>
          <Label>Search Categories</Label>
          <SearchField.Group>
            <SearchField.Input className="w-[280px]" placeholder="Search by name, slug, or description..." />
            <SearchField.ClearButton />
          </SearchField.Group>
          <Description>{filteredCategories.length} category(s) found</Description>
        </SearchField>
        <Button className="flex items-center gap-1" onPress={() => { setIsCreateOpen(true); setCreateThumbnail(""); }}>
          <Plus /> ক্যাটাগরি যুক্ত করুন
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
            aria-label="Category table"
            className="min-w-[700px]"
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            onSelectionChange={setSelectedKeys}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
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
              <Table.Column allowsSorting id="name">
                {({ sortDirection }) => <SortableColumnHeader sortDirection={sortDirection}>Name</SortableColumnHeader>}
              </Table.Column>
              <Table.Column allowsSorting id="slug">
                {({ sortDirection }) => <SortableColumnHeader sortDirection={sortDirection}>Slug</SortableColumnHeader>}
              </Table.Column>
              <Table.Column>Description</Table.Column>
              <Table.Column allowsSorting id="courseCount">
                {({ sortDirection }) => <SortableColumnHeader sortDirection={sortDirection}>Courses</SortableColumnHeader>}
              </Table.Column>
              <Table.Column allowsSorting id="status">
                {({ sortDirection }) => <SortableColumnHeader sortDirection={sortDirection}>Status</SortableColumnHeader>}
              </Table.Column>
              <Table.Column className="text-end">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {paginatedCategories.map((cat) => (
                <Table.Row key={cat._id} id={cat._id}>
                  <Table.Cell>
                    {cat.image
                      ? <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded-lg" />
                      : <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400"><FaTags /></div>
                    }
                  </Table.Cell>
                  <Table.Cell className="pr-0">
                    <Checkbox aria-label={`Select ${cat.name}`} slot="selection" variant="secondary">
                      <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
                    </Checkbox>
                  </Table.Cell>
                  <Table.Cell className="text-xs text-gray-400 font-mono">{cat._id}</Table.Cell>
                  <Table.Cell className="font-medium">{cat.name}</Table.Cell>
                  <Table.Cell>
                    <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{cat.slug}</span>
                  </Table.Cell>
                  <Table.Cell className="text-sm text-gray-500 max-w-[200px] truncate">{cat.description}</Table.Cell>
                  <Table.Cell>
                    <span className="text-sm font-semibold">{cat.courseCount ?? 0}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Chip color={statusColorMap[cat.status] || "default"} size="sm" variant="soft">{cat.status}</Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-1 justify-end">
                      <Button isIconOnly size="sm" variant="tertiary" onPress={() => setViewCategory(cat)}>
                        <FaEye className="size-4" />
                      </Button>
                      <Button isIconOnly size="sm" variant="tertiary" onPress={() => { setEditCategory(cat); setEditThumbnail(""); }}>
                        <FaPencilAlt className="size-4" />
                      </Button>
                      <Button isIconOnly size="sm" variant="danger-soft" onPress={() => setDeleteCategory(cat)}>
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
            <Pagination.Summary>{startItem} to {endItem} of {filteredCategories.length} results</Pagination.Summary>
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
      <CenterPopover isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="নতুন ক্যাটাগরি তৈরি করুন">
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          <CategoryFormFields thumbnail={createThumbnail} setThumbnail={setCreateThumbnail} />
          <div className="flex justify-end gap-2 mt-2">
            <Button type="submit" className="flex items-center gap-2"><SaveAllIcon /> সংরক্ষণ করুন</Button>
            <Button type="button" variant="secondary" onPress={() => setIsCreateOpen(false)}>বাতিল</Button>
          </div>
        </form>
      </CenterPopover>

      {/* ── VIEW ── */}
      <CenterPopover isOpen={!!viewCategory} onClose={() => setViewCategory(null)} title="ক্যাটাগরি বিবরণ">
        {viewCategory && (
          <div className="flex flex-col gap-4">
            {viewCategory.image && (
              <img src={viewCategory.image} alt={viewCategory.name} className="w-full h-44 object-cover rounded-xl border border-gray-100" />
            )}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400 block text-xs mb-0.5">Name</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">{viewCategory.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs mb-0.5">Slug</span>
                <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{viewCategory.slug}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs mb-0.5">Status</span>
                <Chip color={statusColorMap[viewCategory.status] || "default"} size="sm" variant="soft">{viewCategory.status}</Chip>
              </div>
              <div>
                <span className="text-gray-400 block text-xs mb-0.5">Courses</span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{viewCategory.courseCount ?? 0}</span>
              </div>
              {viewCategory.description && (
                <div className="col-span-2">
                  <span className="text-gray-400 block text-xs mb-0.5">Description</span>
                  <p className="text-gray-700 dark:text-gray-300">{viewCategory.description}</p>
                </div>
              )}
              <div>
                <span className="text-gray-400 block text-xs mb-0.5">Created</span>
                <span className="text-gray-600 dark:text-gray-300 text-xs">
                  {viewCategory.createdAt ? new Date(viewCategory.createdAt).toLocaleDateString("bn-BD") : "—"}
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" onPress={() => setViewCategory(null)}>বন্ধ করুন</Button>
            </div>
          </div>
        )}
      </CenterPopover>

      {/* ── EDIT ── */}
      <CenterPopover isOpen={!!editCategory} onClose={() => setEditCategory(null)} title="ক্যাটাগরি সম্পাদনা করুন">
        {editCategory && (
          <form onSubmit={handleEdit} className="flex flex-col gap-3">
            <CategoryFormFields defaults={editCategory} thumbnail={editThumbnail} setThumbnail={setEditThumbnail} />
            <div className="flex justify-end gap-2 mt-2">
              <Button type="submit" className="flex items-center gap-2"><SaveAllIcon /> আপডেট করুন</Button>
              <Button type="button" variant="secondary" onPress={() => setEditCategory(null)}>বাতিল</Button>
            </div>
          </form>
        )}
      </CenterPopover>

      {/* ── DELETE ── */}
      <CenterPopover isOpen={!!deleteCategory} onClose={() => setDeleteCategory(null)} title="ক্যাটাগরি মুছুন">
        {deleteCategory && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
              {deleteCategory.image
                ? <img src={deleteCategory.image} alt={deleteCategory.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                : <div className="w-14 h-14 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-400 flex-shrink-0"><FaTags size={20} /></div>
              }
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{deleteCategory.name}</p>
                <p className="text-sm text-gray-500 font-mono">{deleteCategory.slug}</p>
                {deleteCategory.courseCount > 0 && (
                  <p className="text-xs text-red-500 mt-1">⚠ এই ক্যাটাগরিতে {deleteCategory.courseCount}টি কোর্স আছে</p>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              আপনি কি নিশ্চিত যে আপনি এই ক্যাটাগরিটি স্থায়ীভাবে মুছে ফেলতে চান? এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="danger" onPress={handleConfirmDelete}>হ্যাঁ, মুছুন</Button>
              <Button variant="secondary" onPress={() => setDeleteCategory(null)}>বাতিল</Button>
            </div>
          </div>
        )}
      </CenterPopover>

      <Toast.Provider placement="top end" />
    </div>
  );
}
