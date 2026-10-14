import { toast, type ExternalToast } from "sonner";

/**
 * Helper notifikasi Sonner yang selaras dengan Design System Gede Bali Guide
 */
export const notify = {
  success: (title: string, description?: string, options?: ExternalToast) =>
    toast.success(title, { description, ...options }),

  error: (title: string, description?: string, options?: ExternalToast) =>
    toast.error(title, { description, ...options }),

  warning: (title: string, description?: string, options?: ExternalToast) =>
    toast.warning(title, { description, ...options }),

  info: (title: string, description?: string, options?: ExternalToast) =>
    toast.info(title, { description, ...options }),

  loading: (title: string, description?: string, options?: ExternalToast) =>
    toast.loading(title, { description, ...options }),

  dismiss: (id?: string | number) => toast.dismiss(id),
};

export { toast };
export default toast;
