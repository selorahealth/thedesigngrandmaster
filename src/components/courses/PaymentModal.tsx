import { useState } from "react";
import type { Course } from "@/data/courses";

type Props = {
  open: boolean;
  onClose: () => void;
  course: Course;
};

type Step = "details" | "payment" | "confirm";

export function PaymentModal({ open, onClose, course }: Props) {
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  if (!open) return null;

  const fullName = `${form.firstName} ${form.lastName}`.trim();
  const whatsappText = course.whatsappMessage.replace(
    "{fullName}",
    fullName || "Student",
  );
  const whatsappUrl = `https://wa.me/2349065718162?text=${encodeURIComponent(whatsappText)}`;

  const price = course.price ?? 0;

  function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone) return;
    setStep("payment");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>

        {step === "details" && (
          <>
            <h3 className="text-xl font-semibold">Your details</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We need this to send you access and the certificate.
            </p>
            <form onSubmit={handleDetailsSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="First name"
                  className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
                <input
                  required
                  placeholder="Last name"
                  className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>
              <input
                required
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                required
                type="tel"
                placeholder="WhatsApp number"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-cobalt py-3 text-sm font-semibold text-white hover:bg-cobalt/90"
              >
                Continue to payment
              </button>
            </form>
          </>
        )}

        {step === "payment" && (
          <>
            <h3 className="text-xl font-semibold">Make payment</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Transfer ₦{price.toLocaleString()} to the account below.
            </p>

            <div className="mt-6 space-y-3 rounded-xl bg-secondary/50 p-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bank</span>
                <span className="font-medium">Opay MFB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account name</span>
                <span className="font-medium">Samuel Ikechukwu Amanze</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account number</span>
                <span className="font-medium tracking-wider">9065718162</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold text-cobalt">
                  ₦{price.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep("confirm")}
              className="mt-6 w-full rounded-xl bg-cobalt py-3 text-sm font-semibold text-white hover:bg-cobalt/90"
            >
              I’ve made the payment
            </button>
            <button
              onClick={() => setStep("details")}
              className="mt-3 w-full text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
          </>
        )}

        {step === "confirm" && (
          <>
            <h3 className="text-xl font-semibold">Almost there</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Thank you. Please send your payment receipt so we can confirm and
              give you immediate access to the course materials and community.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white hover:bg-[#20bd5a]"
            >
              Send receipt on WhatsApp
            </a>
            <p className="mt-4 text-xs text-center text-muted-foreground">
              You will receive the link to your course folder and private community access after confirmation.
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
