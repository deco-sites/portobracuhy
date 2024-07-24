import { HTMLWidget } from "apps/admin/widgets.ts";
import { useId } from "site/sdk/useId.ts";

export interface Props {
  content?: HTMLWidget;
}

export default function RichText({ content }: Props) {
  const id = useId();

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #${id} a {
                color: #a92d13;
                transition: color 0.2s ease-in-out;
            }
            #${id} a:hover {
                color: #000;
            }
        `,
        }}
      />
      <div class="mx-auto w-full max-w-[1280px] px-[15px]">
        {content && (
          <div
            id={id}
            class="prose bg-info py-[45px] px-5"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        )}
      </div>
    </>
  );
}
