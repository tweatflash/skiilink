import { Button } from "./ui/button2"
import { Input } from "./ui/input"

export function NewsletterSection() {
  return (
    <section className="bg-black/90 py-16 text-white md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className=" text-3xl font-normal tracking-tight md:text-4xl">
            Stay Updated with Latest Offers
          </h2>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Subscribe to our newsletter and get exclusive deals, product launches, and energy-saving tips delivered to
            your inbox.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="h-12 flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/60"
            />
            <Button type="submit" size="lg" className="h-12 bg-white text-black hover:bg-white/90">
              Subscribe Now
            </Button>
          </form>
          <p className="mt-4 text-sm opacity-75">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
