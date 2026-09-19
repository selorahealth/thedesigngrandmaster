import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Cursor } from "@/components/site/Cursor";
import { courses } from "@/data/courses";
import { getCourseImages } from "@/lib/course-images";

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
  const { data: images = {}, isLoading } = useQuery({
    queryKey: ["course-images"],
    queryFn: getCourseImages,
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Cursor />
      <Nav />

      <section className="shell section-y">
        <div className="text-center">
          <p className="eyebrow mb-4">Courses</p>
          <h1 className="display text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto">
            Learn the skills.{" "}
            <span className="text-cobalt">Ship the work.</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground text-lg">
            Self-paced courses built for people who want practical results, not
            theory.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="grid w-full max-w-md gap-8 sm:max-w-none sm:grid-cols-2 lg:max-w-4xl">
            {courses.map((course) => {
              const image = images[course.slug] ?? course.image;

              return (
                <Link
                  key={course.slug}
                  to="/courses/$slug"
                  params={{ slug: course.slug }}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:border-cobalt/60"
                >
                  {/* 1:1 image */}
                  <div className="aspect-square w-full overflow-hidden bg-secondary/40">
                    {image ? (
                      <img
                        src={image}
                        alt={course.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        {isLoading ? "Loading…" : "No image"}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {course.badge && (
                      <span className="mb-3 inline-block rounded-full bg-cobalt/15 px-3 py-1 text-xs font-medium text-cobalt">
                        {course.badge}
                      </span>
                    )}

                    <h2 className="display text-xl md:text-2xl transition-colors group-hover:text-cobalt">
                      {course.title}
                      {course.version && (
                        <span className="ml-2 text-sm font-sans font-medium text-muted-foreground">
                          {course.version}
                        </span>
                      )}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {course.description}
                    </p>

                    <div className="mt-4 flex items-baseline gap-3">
                      {typeof course.price === "number" ? (
                        <>
                          <span className="text-xl font-semibold">
                            ₦{course.price.toLocaleString()}
                          </span>
                          {typeof course.originalPrice === "number" && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₦{course.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-sm font-medium text-cobalt">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
