export default function HomePageSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      <section className="bg-white py-8">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        </div>
      </section>
      <section className="border-b border-(--border) bg-(--surface-strong) py-4">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="mx-auto h-3 w-72 rounded bg-(--surface)" />
        </div>
      </section>

      <section className="overflow-hidden bg-(--surface)">
        <div className="flex min-h-[50vh] flex-col items-center justify-between md:h-125 md:flex-row">
          <div className="w-full px-8 py-12 md:w-1/2 md:px-20">
            <div className="h-3 w-28 rounded bg-(--surface-strong)" />
            <div className="mt-4 h-10 w-3/4 rounded bg-(--surface-strong)" />
            <div className="mt-3 h-4 w-2/3 rounded bg-(--surface-strong)" />
            <div className="mt-8 h-11 w-40 rounded-md bg-(--surface-strong)" />
          </div>
          <div className="flex h-full w-full items-center justify-center p-8 md:w-1/2">
            <div className="h-75 w-full rounded-2xl bg-(--surface-strong) md:h-100" />
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 md:py-8">
        <section className="w-full">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl bg-(--surface)">
                <div className="h-40 bg-(--surface-strong)" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-2/3 rounded bg-(--surface-strong)" />
                  <div className="h-3 w-1/2 rounded bg-(--surface-strong)" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full">
          <div className="h-6 w-52 rounded bg-(--surface-strong)" />
          <div className="mt-2 h-4 w-96 max-w-full rounded bg-(--surface-strong)" />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface)">
                <div className="h-44 bg-(--surface-strong)" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-1/2 rounded bg-(--surface-strong)" />
                  <div className="h-3 w-3/4 rounded bg-(--surface-strong)" />
                  <div className="h-3 w-1/3 rounded bg-(--surface-strong)" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-(--border) bg-(--surface) p-4 md:p-6">
            <div className="h-4 w-32 rounded bg-(--surface-strong)" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-xl border border-(--border) bg-(--surface-strong)">
                  <div className="h-24 bg-(--surface)" />
                  <div className="p-2">
                    <div className="mx-auto h-3 w-3/5 rounded bg-(--surface)" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-2 rounded-2xl bg-(--surface-strong) p-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-3 w-full rounded bg-(--surface)" />
            ))}
          </div>
        </section>

        {Array.from({ length: 2 }).map((_, sectionIndex) => (
          <section key={sectionIndex} className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-6 w-40 rounded bg-(--surface-strong)" />
                <div className="mt-2 h-4 w-72 max-w-full rounded bg-(--surface-strong)" />
              </div>
              <div className="h-4 w-16 rounded bg-(--surface-strong)" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((__, cardIndex) => (
                <div
                  key={cardIndex}
                  className="overflow-hidden rounded-xl border border-(--border) bg-(--surface) md:rounded-2xl"
                >
                  <div className="h-36 bg-(--surface-strong) md:h-52" />
                  <div className="space-y-1.5 p-3 md:space-y-2 md:p-4">
                    <div className="h-3 w-20 rounded bg-(--surface-strong)" />
                    <div className="h-4 w-4/5 rounded bg-(--surface-strong)" />
                    <div className="h-4 w-1/3 rounded bg-(--surface-strong)" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="w-full space-y-5">
          <div className="rounded-2xl border border-(--border) bg-(--surface) p-3 md:p-4">
            <div className="h-4 w-40 rounded bg-(--surface-strong)" />
            <div className="mt-2 h-7 w-72 max-w-full rounded bg-(--surface-strong)" />
            <div className="mt-2 h-4 w-96 max-w-full rounded bg-(--surface-strong)" />
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-xl border border-(--border) bg-(--surface-strong)">
                  <div className="h-24 bg-(--surface)" />
                  <div className="space-y-2 p-2">
                    <div className="mx-auto h-3 w-3/4 rounded bg-(--surface)" />
                    <div className="mx-auto h-3 w-1/3 rounded bg-(--surface)" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-(--border) bg-(--surface) p-4 md:p-5">
            <div className="mx-auto h-9 w-80 max-w-full rounded bg-(--surface-strong)" />
            <div className="mx-auto mt-2 h-5 w-56 rounded bg-(--surface-strong)" />
            <div className="mx-auto mt-3 h-px w-20 bg-(--surface-strong)" />
            <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-11 w-28 rounded-full bg-(--surface-strong)" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-(--border)" />
              <div className="h-8 w-72 max-w-full rounded bg-(--surface-strong)" />
              <div className="h-px flex-1 bg-(--border)" />
            </div>
            <div className="rounded-2xl border border-(--border) bg-(--surface) p-3 md:p-4">
              <div className="mt-1 flex flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-8 w-24 rounded-full bg-(--surface-strong)" />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-(--border) bg-(--surface) p-3 md:p-4">
            <div className="h-7 w-52 rounded bg-(--surface-strong)" />
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-8 w-24 rounded-full bg-(--surface-strong)" />
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-(--border) bg-(--surface-strong)">
        <div className="grid w-full gap-6 px-4 py-8 md:grid-cols-4 md:px-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-28 rounded bg-(--surface)" />
              <div className="h-4 w-44 rounded bg-(--surface)" />
              <div className="h-3 w-full rounded bg-(--surface)" />
              <div className="h-3 w-5/6 rounded bg-(--surface)" />
            </div>
          ))}
        </div>
        <div className="border-t border-(--border) px-4 py-4">
          <div className="mx-auto h-3 w-64 rounded bg-(--surface)" />
        </div>
      </footer>
    </div>
  );
}
