export interface Props {
  title?: string;
}

export default function PageTitle({ title }: Props) {
  return (
    <div class="mx-auto text-center w-full max-w-[1280px] px-[15px] mt-[60px]">
      <h1 class="text-secondary text-[26px] font-black lg:text-[41.6px] mb-8">
        {title}
      </h1>
    </div>
  );
}
