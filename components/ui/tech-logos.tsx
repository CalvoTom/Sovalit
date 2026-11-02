import { siDocker, siNextdotjs, siPostgresql, siPython, siPytorch, siReact, siScikitlearn, siTypescript, type SimpleIcon } from "simple-icons";

const stack: SimpleIcon[] = [siNextdotjs, siReact, siTypescript, siPython, siPytorch, siScikitlearn, siPostgresql, siDocker];

/** Logos officiels (Simple Icons) des technologies utilisées au quotidien. */
export function TechLogos({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-7 gap-y-4 ${className}`}>
      {stack.map((icon) => (
        <li key={icon.slug} className="flex items-center gap-2 text-[0.95rem] font-medium">
          <svg role="img" viewBox="0 0 24 24" className="size-[18px] fill-current" aria-hidden>
            <path d={icon.path} />
          </svg>
          {icon.title}
        </li>
      ))}
    </ul>
  );
}
