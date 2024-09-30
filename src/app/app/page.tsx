"use client";
import { useEffect, useMemo, useState } from "react";
import { AppRoot, Tabbar } from "@telegram-apps/telegram-ui";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { Icon28Attach } from "@telegram-apps/telegram-ui/dist/icons/28/attach";
import {
  useInitData,
  useLaunchParams,
  type User,
} from "@telegram-apps/sdk-react";
import HomeIcon from "@/icons/HomeIcon";
import WalletIcon from "@/icons/WalletIcon";
import InviteFriends from "@/components/Refer";
import Wallet from "@/components/Wallet";
import WatchAndEarn from "@/components/WatchAndEarn";
import { DisplayDataRow } from "@/components/DisplayData/DisplayData";
function getUserRows(user: User): DisplayDataRow[] {
  return [
    { title: "id", value: user.id.toString() },
    { title: "username", value: user.username },
    { title: "photo_url", value: user.photoUrl },
    { title: "last_name", value: user.lastName },
    { title: "first_name", value: user.firstName },
    { title: "is_bot", value: user.isBot },
    { title: "is_premium", value: user.isPremium },
    { title: "language_code", value: user.languageCode },
    { title: "allows_to_write_to_pm", value: user.allowsWriteToPm },
    { title: "added_to_attachment_menu", value: user.addedToAttachmentMenu },
  ];
}
export default function Home() {
  const [user, setUser] = useState<any[]>();
  const [selectedTab, setSelectedTab] = useState("home");
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();
  const [chatId, setChatId] = useState<string>("");

  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData || !initDataRaw) {
      return;
    }
    const {
      hash,
      queryId,
      chatType,
      chatInstance,
      authDate,
      startParam,
      canSendAfter,
      canSendAfterDate,
    } = initData;
    return [
      { title: "raw", value: initDataRaw },
      { title: "auth_date", value: authDate.toLocaleString() },
      { title: "auth_date (raw)", value: authDate.getTime() / 1000 },
      { title: "hash", value: hash },
      { title: "can_send_after", value: canSendAfterDate?.toISOString() },
      { title: "can_send_after (raw)", value: canSendAfter },
      { title: "query_id", value: queryId },
      { title: "start_param", value: startParam },
      { title: "chat_type", value: chatType },
      { title: "chat_instance", value: chatInstance },
    ];
  }, [initData, initDataRaw]);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.user ? getUserRows(initData.user) : undefined;
  }, [initData]);

  const receiverRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.receiver
      ? getUserRows(initData.receiver)
      : undefined;
  }, [initData]);

  const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData?.chat) {
      return;
    }
    const { id, title, type, username, photoUrl } = initData.chat;

    return [
      { title: "id", value: id.toString() },
      { title: "title", value: title },
      { title: "type", value: type },
      { title: "username", value: username },
      { title: "photo_url", value: photoUrl },
    ];
  }, [initData]);
  useEffect(() => {
    if (!initDataRows || !userRows) {
      return;
    }
    var datat: any[] = [];

    userRows?.map((value) => {
      const title = value.title;
      const data = value.value;
      datat.push({ [title]: data });
    });
    initDataRows?.map((value) => {
      const title = value.title;
      const data = value.value;
      datat.push({ [title]: data });
    });
    setChatId(datat[0].id);
    setUser(datat);
    (async function initData() {
      const fata = await fetch(`api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datat[0]),
      });
      const data: any = await fata.json();
      setUser(data);
    })();
  }, [initDataRows, userRows]);

  const renderContent = () => {
    switch (selectedTab) {
      case "home":
        return <WatchAndEarn id={chatId} />;
      case "refer":
        return (
          <InviteFriends
            id={parseInt(chatId)}
            level1={10}
            level2={5}
            level3={2.5}
          />
        );
      case "wallet":
        return <Wallet id={chatId} />;
      default:
        return null;
    }
  };
  if (!user) {
    return (
      <>
        <div style={styles.error}>
          <img
            src="/coinrush.png"
            alt="Logo"
            className="w-32 h-32 animate-bounce"
          />
        </div>
      </>
    );
  }
  return (
    <AppRoot appearance="dark" platform="base" className="bg-black">
      <div className="pb-24 text-white">
        <div className=" min-h-screen m-4">{renderContent()}</div>
        <Tabbar className="bg-black">
          <Tabbar.Item
            className="bg-black"
            text="Home"
            selected={selectedTab === "home"}
            onClick={() => setSelectedTab("home")}
          >
            <HomeIcon />
          </Tabbar.Item>
          <Tabbar.Item
            className="bg-black"
            text="Refer"
            selected={selectedTab === "refer"}
            onClick={() => setSelectedTab("refer")}
          >
            <Icon28Attach />
          </Tabbar.Item>
          <Tabbar.Item
            className="bg-black"
            text="Wallet"
            selected={selectedTab === "wallet"}
            onClick={() => setSelectedTab("wallet")}
          >
            <WalletIcon />
          </Tabbar.Item>
        </Tabbar>
      </div>
    </AppRoot>
  );
}

const styles = {
  error: {
    fontFamily:
      'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
} as const;
