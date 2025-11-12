import { useEffect, useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Swarajyache Armar
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Premium modular kitchens, wardrobes, and bespoke carpentry crafted to fit your home perfectly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#book" className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold shadow">
              Book Appointment
            </a>
            <a href="#gallery" className="bg-white hover:bg-gray-50 text-gray-900 py-3 px-6 rounded-lg font-semibold border shadow-sm">
              View Gallery
            </a>
          </div>
        </div>
        <div className="relative">
          <img className="rounded-2xl shadow-xl w-full object-cover" src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" alt="Modular kitchen" />
        </div>
      </div>
    </section>
  )
}

function Services() {
  const [services, setServices] = useState([])
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/services`).then(r=>r.json()).then(setServices).catch(()=>{})
  }, [])
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
        <p className="text-gray-600 mt-2">Transparent pricing and top quality workmanship.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="rounded-xl border p-6 hover:shadow-md transition bg-white">
              <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
              <p className="text-gray-600 mt-2 min-h-[48px]">{s.description}</p>
              <div className="mt-4 text-orange-700 font-bold">Starting at ₹{s.starting_price} <span className="font-medium text-gray-500">{s.unit}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const [images, setImages] = useState([])
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/gallery`).then(r=>r.json()).then(setImages).catch(()=>{})
  }, [])
  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">Project Gallery</h2>
        <p className="text-gray-600 mt-2">A glimpse of our recent work.</p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-xl bg-white border">
              <img src={`${img.url}&auto=format&fit=crop&w=900&q=60`} alt={img.title || 'Gallery'} className="w-full h-52 object-cover hover:scale-105 transition" />
              {img.title && <div className="p-3 text-sm text-gray-700">{img.title}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteForm() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', requirement:'', budget:'' })
  const [status, setStatus] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const res = await fetch(`${BACKEND_URL}/api/quotes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.status === 'success') setStatus('We received your request. Our team will contact you shortly.')
      else setStatus('Submitted. We will reach out soon.')
      setForm({ name:'', phone:'', email:'', requirement:'', budget:'' })
    } catch {
      setStatus('Could not submit right now. Please try again later.')
    }
  }
  return (
    <section id="quote" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">Get a Free Quote</h2>
        <p className="text-gray-600 mt-2">Tell us about your project and we’ll share an estimate.</p>
        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border">
          <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
          <input className="input sm:col-span-2" placeholder="Email (optional)" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <input className="input sm:col-span-2" placeholder="Budget (optional)" value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})} />
          <textarea className="input sm:col-span-2 h-28" placeholder="Requirement" value={form.requirement} onChange={e=>setForm({...form, requirement:e.target.value})} required />
          <button className="sm:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold">Submit</button>
        </form>
        {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
      </div>
    </section>
  )
}

function AppointmentForm() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'', preferred_date:'', preferred_time:'', message:'' })
  const [status, setStatus] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('Booking...')
    try {
      const res = await fetch(`${BACKEND_URL}/api/appointments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.status === 'success') setStatus('Appointment booked! We will confirm shortly.')
      else setStatus('Request received. Our team will confirm.')
      setForm({ name:'', phone:'', email:'', service:'', preferred_date:'', preferred_time:'', message:'' })
    } catch {
      setStatus('Could not book right now. Please try again later.')
    }
  }
  return (
    <section id="book" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">Book an Appointment</h2>
        <p className="text-gray-600 mt-2">Select a service and preferred date/time. We’ll call to confirm.</p>
        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-xl border">
          <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
          <input className="input sm:col-span-2" placeholder="Email (optional)" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <input className="input" placeholder="Service (e.g., Modular Kitchen)" value={form.service} onChange={e=>setForm({...form, service:e.target.value})} required />
          <input className="input" type="date" value={form.preferred_date} onChange={e=>setForm({...form, preferred_date:e.target.value})} required />
          <input className="input" placeholder="Preferred time" value={form.preferred_time} onChange={e=>setForm({...form, preferred_time:e.target.value})} />
          <textarea className="input sm:col-span-2 h-28" placeholder="Message (optional)" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
          <button className="sm:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold">Book Now</button>
        </form>
        {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-600 mt-2">We’d love to hear from you.</p>
          <div className="mt-6 space-y-3 text-gray-800">
            <p><strong>Phone:</strong> +91-9XXXX-XXXXX</p>
            <p><strong>Email:</strong> hello@swarajyachearmar.com</p>
            <p><strong>Address:</strong> Pune, Maharashtra, India</p>
            <p><strong>Timings:</strong> Mon-Sat 10:00 AM - 7:00 PM</p>
          </div>
        </div>
        <iframe className="w-full h-80 rounded-xl border" loading="lazy" allowFullScreen src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.938680178267!2d73.8567!3d18.5000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06a3d0f123%3A0x0000000000000000!2sPune!5e0!3m2!1sen!2sin!4v1700000000000"></iframe>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-xl">Swarajyache Armar</h3>
          <p className="mt-2 text-sm">Design. Craft. Install. We deliver functional and elegant interiors.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#gallery" className="hover:text-white">Gallery</a></li>
            <li><a href="#quote" className="hover:text-white">Get Quote</a></li>
            <li><a href="#book" className="hover:text-white">Book Appointment</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold">Follow</h4>
          <div className="mt-2 flex gap-3 text-sm">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-sm">© {new Date().getFullYear()} Swarajyache Armar. All rights reserved.</div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen text-gray-900">
      <Hero />
      <Services />
      <Gallery />
      <QuoteForm />
      <AppointmentForm />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
