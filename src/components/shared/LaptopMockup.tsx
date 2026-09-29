import Image from "next/image";

type LaptopMockupProps = {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
};

export function LaptopMockup({
  src,
  alt,
  className = "",
  objectPosition = "center",
  priority = false,
}: LaptopMockupProps) {
  return (
    <div className={`relative w-full pb-[3.5%] ${className}`}>
      <div
        className="relative z-[1] mx-auto w-[90%] rounded-t-[12px] bg-[#17191d] p-[1.7%] pb-[1.45%] sm:rounded-t-[16px]"
        style={{
          boxShadow:
            "0 12px 30px rgba(23, 25, 29, 0.2), inset 0 0 0 1px rgba(255,255,255,0.14)",
        }}
      >
        <span className="absolute left-1/2 top-[0.65%] h-[2px] w-[2px] -translate-x-1/2 rounded-full bg-white/25 sm:h-[3px] sm:w-[3px]" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[5px] bg-[#f4f1eb] sm:rounded-[7px]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 90vw, 620px"
            className="object-cover"
            style={{ objectPosition }}
          />
        </div>
      </div>

      <div
        className="relative z-[2] mx-auto h-[clamp(7px,1.45vw,13px)] w-full rounded-b-[14px]"
        style={{
          background:
            "linear-gradient(180deg, #d9dce0 0%, #aeb3b9 46%, #d7d9dc 100%)",
          boxShadow:
            "0 5px 10px rgba(22, 24, 28, 0.16), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <span
          className="absolute left-1/2 top-0 h-[42%] w-[13%] -translate-x-1/2 rounded-b-full"
          style={{ background: "rgba(120, 125, 132, 0.28)" }}
        />
      </div>

      <div className="absolute bottom-0 left-[8%] right-[8%] h-[6%] rounded-full bg-black/20 blur-[7px]" />
    </div>
  );
}
