import suiseShot from "@/assets/project-screens/suise-dashboard.png";
import a01luxeShot from "@/assets/project-screens/a01luxe-shop-dashboard.png";
import pulsetalksShot from "@/assets/project-screens/pulsetalks-hero-section.png";
import wilShot from "@/assets/project-screens/women-in-leadership-hero-section.png";
import interiorShot from "@/assets/project-screens/interior-hero-section.png";
import selorahShot from "@/assets/project-screens/selorah-desktop-screen.png";
import selorahMobile from "@/assets/project-screens/selorah-mobile.png";
import syncstepShot from "@/assets/project-screens/syncstep-hero-section.png";
import tojuShot from "@/assets/project-screens/toju-hero-section.png";
import fixbaseMobile from "@/assets/project-screens/fixbase-mobile.png";
import rektpayMobile from "@/assets/project-screens/rektpay-mobile.png";
import solaribShot from "@/assets/project-screens/solarib-desktop.png";
import webreShot from "@/assets/project-screens/webre-desktop.png";
import hausShot from "@/assets/project-screens/haus-desktop.png";
import hausMobile from "@/assets/project-screens/haus-mobile.png";
import newmanShot from "@/assets/project-screens/newmanstores-desktop.png";
import newmanMobile from "@/assets/project-screens/newmanstores-mobile.png";

/**
 * Screens shipped with the build. The CMS stores either one of these file
 * names or a full image URL uploaded by an admin.
 */
export const bundledScreens: Record<string, string> = {
  "suise-dashboard.png": suiseShot,
  "a01luxe-shop-dashboard.png": a01luxeShot,
  "pulsetalks-hero-section.png": pulsetalksShot,
  "women-in-leadership-hero-section.png": wilShot,
  "interior-hero-section.png": interiorShot,
  "selorah-desktop-screen.png": selorahShot,
  "selorah-mobile.png": selorahMobile,
  "syncstep-hero-section.png": syncstepShot,
  "toju-hero-section.png": tojuShot,
  "fixbase-mobile.png": fixbaseMobile,
  "rektpay-mobile.png": rektpayMobile,
  "solarib-desktop.png": solaribShot,
  "webre-desktop.png": webreShot,
  "haus-desktop.png": hausShot,
  "haus-mobile.png": hausMobile,
  "newmanstores-desktop.png": newmanShot,
  "newmanstores-mobile.png": newmanMobile,
};

export const bundledScreenNames = Object.keys(bundledScreens);

export function resolveScreen(value?: string | null): string {
  if (!value) return "";
  if (value.startsWith("http") || value.startsWith("/") || value.startsWith("data:")) return value;
  return bundledScreens[value] ?? "";
}
