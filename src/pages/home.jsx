import QuillEditor from "components/QuilEditor";
import hljs from "highlight.js";
export default function Home() {

  return (
    <div className="overflow-hidden justify-center items-center flex h-screen max-h-screen ">
      <h1>This is home </h1>
      <QuillEditor />
    </div>
  );
}
