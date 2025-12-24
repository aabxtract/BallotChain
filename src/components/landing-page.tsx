import { Button } from '@/components/ui/button';
import { Vote, Lock, Users, BarChart } from 'lucide-react';
import Link from 'next/link';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-card/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
               <div className="p-4 rounded-full bg-primary/10">
                 <div className="p-3 rounded-full bg-primary/20">
                   <Vote className="w-10 h-10 text-primary" />
                 </div>
               </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Secure, Transparent, Decentralized Voting with Ballotz
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                A universal voting platform for organizations big and small, built on the Stacks L2 to leverage the security of Bitcoin. Run transparent and secure elections for everything from major public issues to minor team decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button size="lg" asChild>
                  <Link href="/elections">Launch App</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/create-election">Create Election</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need for Fair Elections</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ballotz provides a robust set of features to ensure your voting process is secure, transparent, and easy to manage.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                <div className="p-3 rounded-full bg-primary/10">
                    <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Token-Gated Access</h3>
                <p className="text-muted-foreground">
                  Restrict voting to holders of a specific NFT or fungible token, perfect for DAOs and private communities.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                <div className="p-3 rounded-full bg-primary/10">
                    <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Public & Private Elections</h3>
                <p className="text-muted-foreground">
                  Create public elections open to everyone or private ones for your specific organization.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                 <div className="p-3 rounded-full bg-primary/10">
                    <BarChart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Transparent Results</h3>
                <p className="text-muted-foreground">
                  All votes are recorded on-chain, making the process verifiable, immutable, and censorship-resistant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
            <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Built on a Foundation of Trust
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Ballotz is built on the principle of verifiable trust. By anchoring the voting process to Bitcoin via the Stacks layer, it provides a platform where transparency and fairness are not just promised but are mathematically guaranteed.
                </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                    <img src="https://picsum.photos/seed/stacks/600/400" data-ai-hint="blockchain abstract" alt="Blockchain" className="rounded-lg object-cover" />
                </div>
            </div>
        </section>


        {/* CTA Section */}
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4">
              Create your first election in minutes and bring decentralized, transparent voting to your community.
            </p>
            <div className="mt-6">
              <Button size="lg" asChild>
                <Link href="/create-election">Create Your Election Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
