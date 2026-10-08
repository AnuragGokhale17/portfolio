import { Nav } from "@/components/Nav";
import { Hero, FloatingBadge } from "@/components/Hero";
import { Marquee, Stats } from "@/components/Marquee";
import { Work } from "@/components/Work";
import { RoostFlow } from "@/components/RoostFlow";
import { Approach } from "@/components/Approach";
import { Stack } from "@/components/Stack";
import { Path } from "@/components/Path";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <FloatingBadge />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <RoostFlow />
        <Approach />
        <Stack />
        <Path />
        <Contact />
      </main>
    </>
  );
}
