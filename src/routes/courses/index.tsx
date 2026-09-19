import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Cursor } from "@/components/site/Cursor";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Courses | Thedesigngrandmaster" },
      {
        name: "description",
        content:
          "Self-paced courses in graphic design and vibecoding. Learn practical skills and ship real work.",
      },
    ],
  }),
  component: CoursesIndex,
});

function CoursesIndex() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Cursor />
      <Nav />

      <section className="shell section-y">
        <p className="eyebrow mb-4">Courses</p>
        <h1 className="display text-4xl md:text-6xl max-w-3xl">
          Learn the skills. Ship the work.
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground text-lg">
          Self-paced courses built for people who want practical results, not theory.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {courses.map((course) => (
            <Link
              key={course.slug}
              to="/courses/$slug"
              params={{ slug: course.slug }}
              className="group block rounded-2xl border border-border bg-card p-8 transition hover:border-cobalt/60"
            >
              {course.badge && (
                <span className="inline-block rounded-full bg-cobalt/15 px-3 py-1 text-xs font-medium text-cobalt mb-4">
                  {course.badge}
                </span>
              )}
              <h2 className="display text-2xl md:text-3xl group-hover:text-cobalt transition-colors">
                {course.title}
                {course.version && (
                  <span className="ml-2 text-sm font-sans font-medium text-muted-foreground">
                    {course.version}
                  </span>
                )}
              </h2>
              <p className="mt-3 text-muted-foreground line-clamp-2">
                {course.description}
              </p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-foreground">
                  ₦{course.price.toLocaleString()}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₦{course.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{course.duration}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
