import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Cursor } from "@/components/site/Cursor";
import { getCourse } from "@/data/courses";
import { PaymentModal } from "@/components/courses/PaymentModal";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) {
      throw notFound();
    }
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.course.title} | Thedesigngrandmaster`
          : "Course | Thedesigngrandmaster",
      },
      {
        name: "description",
        content: loaderData?.course.description ?? "",
      },
    ],
  }),
  component: CourseDetail,
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Cursor />
      <Nav />

      <section className="shell section-y">
        <Link
          to="/courses"
          className="text-sm text-muted-foreground hover:text-cobalt transition-colors"
        >
          ← All courses
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Left content */}
          <div>
            {course.badge && (
              <span className="inline-block rounded-full bg-cobalt/15 px-3 py-1 text-xs font-medium text-cobalt mb-4">
                {course.badge}
              </span>
            )}

            {/* 1:1 course image */}
            {course.image && (
              <div className="mb-8 aspect-square max-w-md overflow-hidden rounded-2xl border border-border">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <h1 className="display text-4xl md:text-5xl lg:text-6xl">
              {course.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              {course.description}
            </p>

            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Who this course is for</h2>
              <ul className="space-y-3">
                {course.whoFor.map((item) => (
                  <li key={item} className="flex gap-3 text-muted-foreground">
                    <span className="text-cobalt mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Course outline</h2>
              <ol className="space-y-3">
                {course.outline.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-sm text-muted-foreground w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">What you get</h2>
              <ul className="space-y-3">
                {course.bonuses.map((b) => (
                  <li key={b} className="flex gap-3 text-muted-foreground">
                    <span className="text-cobalt">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky buy card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-border bg-card p-8">
              {/* Safe price handling */}
              <div className="flex items-baseline gap-3">
                {typeof course.price === "number" ? (
                  <>
                    <span className="text-3xl font-semibold">
                      ₦{course.price.toLocaleString()}
                    </span>
                    {typeof course.originalPrice === "number" && (
                      <span className="text-muted-foreground line-through">
                        ₦{course.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-lg font-medium text-cobalt">Coming soon</span>
                )}
              </div>

              <p className="mt-2 text-sm text-muted-foreground">{course.duration}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tools: {course.tools?.join(" · ") ?? "—"}
              </p>

              {/* Enrol button only when price exists */}
              {typeof course.price === "number" ? (
                <button
                  onClick={() => setOpen(true)}
                  className="mt-8 w-full rounded-xl bg-cobalt px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-cobalt/90"
                >
                  Enrol now
                </button>
              ) : (
                <button
                  disabled
                  className="mt-8 w-full cursor-not-allowed rounded-xl bg-secondary px-6 py-3.5 text-sm font-semibold text-muted-foreground"
                >
                  Coming soon
                </button>
              )}

              <p className="mt-4 text-xs text-center text-muted-foreground">
                Lifetime access · Certificate included
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {typeof course.price === "number" && (
        <PaymentModal open={open} onClose={() => setOpen(false)} course={course} />
      )}
    </main>
  );
}
