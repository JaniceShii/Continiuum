import { db } from "~/server/db";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main>
      <div>Whats up</div>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            {post.id} - {post.name}
          </div>
        ))}
      </div>
    </main>
  );
}
