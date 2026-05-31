import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("id");

  if (!movieId) {
    return NextResponse.json({ error: "No movie ID" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return NextResponse.json({ poster_path: data.poster_path });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}