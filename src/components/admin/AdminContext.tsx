"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

export interface AdminUser {
  email: string;
  name?: string;
  picture?: string;
  role?: string;
}

interface AdminContextType {
  lang: "id" | "en";
  setLang: (lang: "id" | "en") => void;
  adminUser: AdminUser | null;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (val: boolean) => void;
  isSaving: boolean;
  setIsSaving: (val: boolean) => void;
  lastSavedTime: string | null;
  setLastSavedTime: (time: string | null) => void;
  saveStatus: { type: "idle" | "success" | "error"; message?: string };
  setSaveStatus: (status: { type: "idle" | "success" | "error"; message?: string }) => void;
  saveHandler: (() => Promise<void>) | null;
  registerSaveHandler: (fn: (() => Promise<void>) | null) => void;
  triggerSave: () => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [lang, setLangState] = useState<"id" | "en">("id");
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });
  const [saveHandler, setSaveHandler] = useState<(() => Promise<void>) | null>(null);

  // Ambil data user dari endpoint session
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setAdminUser(data.user);
          }
        }
      } catch (err) {
        console.error("Gagal memeriksa sesi admin:", err);
      }
    }
    checkSession();
  }, []);

  // Sinkronisasi bahasa dengan localStorage & broadcast event
  const setLang = useCallback((newLang: "id" | "en") => {
    setLangState(newLang);
    try {
      localStorage.setItem("admin_editor_lang", newLang);
      window.dispatchEvent(
        new CustomEvent("adminLanguageChange", { detail: { lang: newLang } })
      );
    } catch {}
  }, []);

  const registerSaveHandler = useCallback((fn: (() => Promise<void>) | null) => {
    setSaveHandler(() => fn);
  }, []);

  const triggerSave = useCallback(async () => {
    if (saveHandler) {
      await saveHandler();
    }
  }, [saveHandler]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      const auth = getFirebaseAuth();
      if (auth) {
        await signOut(auth);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAdminUser(null);
      router.push("/admin/login");
      router.refresh();
    }
  }, [router]);

  return (
    <AdminContext.Provider
      value={{
        lang,
        setLang,
        adminUser,
        hasUnsavedChanges,
        setHasUnsavedChanges,
        isSaving,
        setIsSaving,
        lastSavedTime,
        setLastSavedTime,
        saveStatus,
        setSaveStatus,
        saveHandler,
        registerSaveHandler,
        triggerSave,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext harus digunakan di dalam AdminProvider.");
  }
  return context;
}
