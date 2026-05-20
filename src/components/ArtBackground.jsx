export default function ArtBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 art-paper" />
      <div className="absolute inset-0 art-canvas-vignette" />

      <div className="absolute -top-28 -left-28 h-[32rem] w-[32rem] art-blob art-blob-1" />
      <div className="absolute top-1/3 -right-36 h-[36rem] w-[36rem] art-blob art-blob-2" />
      <div className="absolute -bottom-40 left-1/4 h-[40rem] w-[40rem] art-blob art-blob-3" />

      <div className="absolute left-[8%] top-[18%] h-24 w-24 art-cutout art-cutout-1" />
      <div className="absolute right-[10%] top-[12%] h-28 w-28 art-cutout art-cutout-2" />
      <div className="absolute right-[18%] bottom-[14%] h-20 w-20 art-cutout art-cutout-3" />
      <div className="absolute left-[12%] bottom-[18%] h-28 w-28 art-cutout art-cutout-4" />
    </div>
  );
}

