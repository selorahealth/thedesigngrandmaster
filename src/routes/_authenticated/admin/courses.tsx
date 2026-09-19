import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAdmin } from "@/hooks/useAdmin";
import { courses } from "@/data/courses";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { AdminFrame } from "./index";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/courses")({
  component: AdminCourses,
});

function AdminCourses() {
  const { isAdmin, loading } = useAdmin();
  const [selected, setSelected] = useState<Record<string, string>>({});

  if (loading) return <AdminFrame>Checking access…</AdminFrame>;
  if (!isAdmin) return <AdminFrame>You need an admin role.</AdminFrame>;

  return (
    <AdminFrame>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Courses
          </p>
          <h1 className="font-display text-3xl text-foreground">Course covers</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Upload a square image for each course. After uploading, copy the URL and paste it into{" "}
            <code className="text-xs">src/data/courses.ts</code> as the <code className="text-xs">image</code> field.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/admin/media">Open Media library</Link>
        </Button>
      </div>

      <div className="space-y-10">
        {courses.map((course) => (
          <div key={course.slug} className="rounded-2xl border border-border p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl">{course.title}</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {course.slug}
                </p>
              </div>
              {selected[course.slug] && (
                <div className="max-w-md text-right">
                  <p className="text-xs text-muted-foreground mb-1">Uploaded URL (copy this)</p>
                  <code className="block break-all rounded bg-secondary/50 px-3 py-2 text-xs">
                    {selected[course.slug]}
                  </code>
                </div>
              )}
            </div>

            <MediaPicker
              folder="course-covers"
              aspect={{ width: 800, height: 800 }}
              value={selected[course.slug]}
              onSelect={(url) =>
                setSelected((prev) => ({ ...prev, [course.slug]: url }))
              }
            />
          </div>
        ))}
      </div>
    </AdminFrame>
  );
}
