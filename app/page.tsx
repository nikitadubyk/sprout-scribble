import getPosts from "@/server/actions/get-posts";
import createPost from "@/server/actions/create-post";

export default async function Home() {
  const { error, success } = await getPosts();

  if (error) {
    return <div>error</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Main page</p>
      {success?.map((value) => (
        <p key={value.id}>{value.title}</p>
      ))}

      <form action={createPost}>
        <input type="text" name="title" placeholder="text" />

        <button type="submit">submit</button>
      </form>
    </main>
  );
}
