// app/admin-live/page.js
"use client";

import { useEffect } from "react";

export default function AdminLive() {
  useEffect(() => {
    // Generate random room and user info
    const roomID = Math.floor(Math.random() * 10000) + "";
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "Host" + userID;
    const appID = 1639255711;
    const serverSecret = "4f743c27dd6c0008ef3cc0814b05c7d7";

    // Wait for Zego to load
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js";
    script.onload = () => {
      const kitToken = window.ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zp = window.ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: document.getElementById("root"),
        scenario: {
          mode: window.ZegoUIKitPrebuilt.LiveStreaming,
          config: { role: window.ZegoUIKitPrebuilt.Host },
        },
        sharedLinks: [
          {
            name: "Join as audience",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?role=Audience&roomID=" +
              roomID,
          },
        ],
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: false,
        showAudioVideoSettingsButton: false,
        showScreenSharingButton: false,
        showTextChat: true,
        showUserList: true,
      });
    };
    document.body.appendChild(script);
  }, []);

  return <div id="root" style={{ width: "60vw", height: "80vh" }}></div>;
}