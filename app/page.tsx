import { Button } from "@/components/ui/button";
import LiveStockCard from "@/components/ui/liveStockCard";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Overlay */}
      
      <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), 
            url('https://wallpapers.com/images/high/mathematics-1920-x-1200-picture-c28s33fnmt1zgjd1.webp')`,
        }}
      ></div>
      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-start p-8 text-foreground">
        {/* Title Section */}
        <section className="flex flex-col items-center justify-center text-center py-20">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6">MUN Quant Society</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Empowering students at Memorial University to explore careers in quantitative finance.
          </p>
          <p className="text-xl text-secondary mb-8">First Meeting: Next Wednesday!</p>
          <p className="text-xl mb-8">12th Feb | 1 PM | EN2022!</p>

          {/* Get Involved Button */}
          <a href="https://forms.gle/4GGqxBNs49x4KNKK7" target="_blank" rel="noopener noreferrer">
            <Button className="bg-primary hover:bg-primary/90 px-6 py-3">Get Involved</Button>
          </a>
        </section>

        <h2 className="text-3xl font-bold mb-20" style={{ color: "#fb8b1e" }}>
          Project Based.  Social Events.    Interview Prep.
        </h2>


        {/* Stock Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-16 w-full max-w-6xl px-4">
          <LiveStockCard ticker="AAPL" />
          <LiveStockCard ticker="GOOG" />
          <LiveStockCard ticker="MSFT" />
          <LiveStockCard ticker="SPY" />

          <LiveStockCard ticker="AMZN" />
          <LiveStockCard ticker="META" />
          <LiveStockCard ticker="TSLA" />
          <LiveStockCard ticker="NVDA" />
        </div>

        {/* Informative Sections */}
        <section className="max-w-4xl mx-auto space-y-16 text-center px-6">
          {/* What We Do Section */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">What We Do?</h2>
            <p className="text-lg text-muted-foreground">
              At MUN Quant Society, we&rsquo;re trying to help students learn about quantitative trading by actively managing a fund, develop models, and gain real-world experience in financial markets. 
              Our intent is to help our members gain hands-on exposure to finance and technology.
            </p>
          </div>

          {/* Our Events Section */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Our Events</h2>
            <p className="text-lg text-muted-foreground">
              We aim to host regular guest speaker events and this will allow us to learn from people in industry.
            </p>
          </div>

          {/* Join Us Section */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Join Us Today!</h2>
            <p className="text-lg text-muted-foreground">
             We have no barrier to entry. MUN Quant Society is the perfect place to grow your knowledge of quantitative finance and connect with like-minded peers.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
