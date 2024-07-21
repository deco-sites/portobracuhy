export interface Props {
  title?: string;
}

export default function Curadoria({ title = "Curadoria" }: Props) {
  return (
    <div class="flex flex-col">
      <h2 class="text-secondary mb-[30px] lg:mb-[60px]">{title}</h2>
    </div>
  );
}
