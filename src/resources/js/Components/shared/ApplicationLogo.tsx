import { SVGAttributes } from "react";

type ApplicationLogoProps = SVGAttributes<SVGElement> & {
  /** Tailwind size class (e.g. "w-32 h-32") */
  sizeClass?: string;
};

export default function ApplicationLogo({
  sizeClass = "w-24 h-24",
  ...svgProps
}: ApplicationLogoProps) {
  return (
    <div className={`${sizeClass}`}>
      <div className="w-full h-full overflow-hidden rounded-full ">
        <svg {...svgProps} viewBox="0 0 1200 1200" version="1.1">
          <g id="root" stroke="none" fill="none" stroke-width="1" fill-rule="evenodd">
            <rect
              id="background.accent"
              x="0"
              y="0"
              width="1200"
              height="1200"
              fill="#e4c2ff"
            ></rect>
            <g id="group-header" transform="translate(160, 530)">
              <rect id="rectangle-header" x="0" y="0" width="656" height="200"></rect>
              <text
                id="headerText.secondary"
                font-size="180"
                data-text-alignment="R"
                fill="#d23daf"
                font-family="Antic Didone"
                font-weight="500"
                font-style="normal"
                letter-spacing="0"
              >
                <tspan y="141" x="0.03369140625">
                  Devlog
                </tspan>
              </text>
            </g>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32 32"
              version="1.1"
              fill="#392F3D"
              id="icon.primary"
              x="780"
              y="440"
              width="320"
              height="320"
            >
              <g id="surface1" fill="#392F3D">
                <path
                  style={{}}
                  d="M 25 2 C 23.699219 2 22.554688 2.859375 22.15625 4.09375 C 22.152344 4.109375 22.128906 4.109375 22.125 4.125 L 19.875 11 L 15 11 C 13.355469 11 12 12.355469 12 14 L 12 15 L 9 15 C 7.355469 15 6 16.355469 6 18 C 6 19.515625 7.15625 20.777344 8.625 20.96875 L 7.28125 25 L 4 25 L 4 27 L 8.71875 27 L 8.9375 26.3125 L 10.71875 21 L 14 21 L 14 28 L 10 28 L 10 30 L 20 30 L 20 28 L 16 28 L 16 21 L 22.96875 21 L 23.1875 20.3125 L 27.875 5.90625 L 27.875 5.875 C 28.359375 4.304688 27.445313 2.609375 25.875 2.125 C 25.589844 2.035156 25.304688 2 25 2 Z M 25 4 C 25.101563 4 25.191406 4.003906 25.28125 4.03125 C 25.816406 4.195313 26.132813 4.75 25.96875 5.28125 L 21.53125 19 L 9 19 C 8.4375 19 8 18.5625 8 18 C 8 17.4375 8.4375 17 9 17 L 20.03125 17 L 20.25 16.3125 L 24.03125 4.71875 C 24.15625 4.3125 24.574219 4 25 4 Z M 15 13 L 19.21875 13 L 18.5625 15 L 14 15 L 14 14 C 14 13.433594 14.433594 13 15 13 Z "
                  fill="#392F3D"
                ></path>
              </g>
            </svg>
          </g>
        </svg>
      </div>
    </div>
  );
}
