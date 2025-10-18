import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Error 404",
};

export default function NotFound() {
  return (
 <section className="flex min-h-screen flex-col overflow-hidden bg-primary py-16 md:px-20 md:py-24">
  <div className="relative flex h-full grow justify-center px-4 md:px-8 md:pt-[15vh]">
    <svg
      width={880}
      height={357}
      viewBox="0 0 880 357"
      fill="none"
      className="text-gray-100 absolute left-1/2 z-0 hidden -translate-x-1/2 md:block"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M439.348 356.4C411.664 356.4 387.902 349.378 368.062 335.336C348.335 321.181 333.148 300.792 322.5 274.167C311.964 247.429 306.696 215.243 306.696 177.609C306.808 139.977 312.132 107.96 322.668 81.5591C333.316 55.0466 348.503 34.8248 368.23 20.8956C388.07 6.96457 411.775 0 439.348 0C466.921 0 490.628 6.96457 510.467 20.8956C530.306 34.8248 545.493 55.0466 556.03 81.5591C566.678 108.072 572.001 140.089 572.001 177.609C572.001 215.357 566.678 247.599 556.03 274.335C545.493 300.96 530.306 321.293 510.467 335.336C490.74 349.378 467.034 356.4 439.348 356.4ZM439.348 303.655C460.869 303.655 477.85 293.039 490.291 271.808C502.845 250.462 509.122 219.064 509.122 177.609C509.122 150.199 506.264 127.17 500.547 108.521C494.831 89.8714 486.761 75.8302 476.337 66.3923C465.913 56.8442 453.583 52.0692 439.348 52.0692C417.94 52.0692 401.016 62.7429 388.574 84.0865C376.132 105.318 369.855 136.494 369.744 177.609C369.632 205.133 372.378 228.275 377.982 247.037C383.698 265.797 391.769 279.952 402.192 289.502C412.616 298.938 425.001 303.655 439.348 303.655Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 285.795V236.083L146.103 4.719H223.778V234.397H267.828V285.795H223.778V349.827H164.261V285.795H0ZM162.244 75.4923H164.933V234.397H63.8888V231.702L162.244 75.4923Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M612.172 236.083V285.795H776.433V349.827H835.951V285.795H880V234.397H835.951V4.719H758.276L612.172 236.083ZM777.106 75.4923H774.416L676.061 231.702V234.397H777.106V75.4923Z"
        fill="currentColor"
      />
    </svg>
    <div className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-start gap-8 md:gap-12 md:pt-[75px]">
      <div className="z-10 flex w-full flex-col gap-4 text-center md:gap-6">
        <h1 className="font-semibold text-primary text-3xl lg:text-6xl">
          We lost this page
        </h1>
        <p className="text-lg text-tertiary md:text-xl">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      <form className="z-10 flex w-full flex-col items-center justify-center gap-4 md:max-w-120 md:flex-row">
        <div
          data-input-wrapper="true"
          className="group flex h-max w-full flex-col items-start justify-start gap-1.5"
          data-rac=""
          data-required="true"
        >
          <div
            role="presentation"
            className="relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-white shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset group-disabled:cursor-not-allowed group-disabled:bg-disabled_subtle group-disabled:ring-disabled group-invalid:ring-error_subtle"
            data-rac=""
          >
            <svg
              viewBox="0 0 24 24"
              width={24}
              height={24}
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="pointer-events-none absolute size-5 text-fg-quaternary left-3.5"
            >
              <path d="m21 21-3.5-3.5m2.5-6a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z" />
            </svg>
            <input
              aria-label="Search our site"
              type="search"
              placeholder="Search our site"
              tabIndex={0}
              id="react-aria-_R_d9bsnpfiv7b_"
              className="m-0 bg-transparent text-md text-primary ring-0 outline-none placeholder:text-placeholder autofill:rounded-lg autofill:text-primary px-3.5 py-2.5 pl-[2.625rem] w-full md:!py-3"
              data-rac=""
              name="search"
              defaultValue=""
              title=""
            />
          </div>
        </div>
        <button
          className="group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px   gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold before:rounded-[7px] data-icon-only:p-3 bg-white text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover w-full md:hidden"
          data-rac=""
          type="submit"
          tabIndex={0}
          data-react-aria-pressable="true"
          id="react-aria-_R_l9bsnpfiv7b_"
        >
          <span data-text="true" className="px-0.5">
            Search
          </span>
        </button>
        <button
          className="group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px   gap-1.5 rounded-lg px-[1.125rem] py-3 text-md font-semibold before:rounded-[7px] data-icon-only:p-[0.875rem] bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover w-max max-md:hidden"
          data-rac=""
          type="submit"
          tabIndex={0}
          data-react-aria-pressable="true"
          id="react-aria-_R_t9bsnpfiv7b_"
        >
          <span data-text="true" className="px-0.5">
            Search
          </span>
        </button>
      </form>
      <div className="z-10 flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-auto">
        <button
          className="group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px   gap-1.5 rounded-lg px-[1.125rem] py-3 text-md font-semibold before:rounded-[7px] data-icon-only:p-[0.875rem] bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover"
          data-rac=""
          type="button"
          tabIndex={0}
          data-react-aria-pressable="true"
        >
          <svg
            viewBox="0 0 24 24"
            width={24}
            height={24}
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            data-icon="leading"
            className="pointer-events-none size-5 shrink-0"
          >
            <path d="M19 12H5m0 0 7 7m-7-7 7-7" />
          </svg>
          <span data-text="true" className="px-0.5">
            Go back
          </span>
        </button>
        <button
          className="group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 *:data-icon:shrink-0 gap-1.5 rounded-lg px-[1.125rem] py-3 text-md font-semibold before:rounded-[7px] data-icon-only:p-[0.875rem] bg-red- text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset hover:bg-brand-solid_hover data-loading:bg-brand-solid_hover before:absolute before:inset-px "
          data-rac=""
          type="button"
          tabIndex={0}
          data-react-aria-pressable="true"
        >
          <span data-text="true" className="px-0.5">
            Go home
          </span>
        </button>
      </div>
    </div>
  </div>
</section>


  );
}
