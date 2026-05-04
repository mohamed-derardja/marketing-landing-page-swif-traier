"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  FileText,
  Users,
  Star,
  Play,
  ChevronRight,
  Globe,
  Maximize2,
  Stethoscope,
  Sparkles,
} from "lucide-react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3"
          : "bg-transparent py-5"
      } fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Stethoscope size={24} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Swift<span className="text-blue-600">Triage</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">
            Fonctionnalites
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Solutions
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Tarifs
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            A propos
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 mr-4 text-slate-500">
            <button className="flex items-center gap-1 hover:text-slate-900 transition-colors">
              <Globe size={18} />
              <span className="text-xs font-bold">FR</span>
            </button>
            <button className="hover:text-slate-900 transition-colors">
              <Maximize2 size={18} />
            </button>
          </div>
          <button className="hidden sm:block px-5 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Se connecter
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
            Obtenir une demo
          </button>
        </div>
      </div>
    </nav>
  );
}

function StickyNote({
  color,
  icon: Icon,
  text,
  position,
}: {
  color: "yellow" | "green" | "blue";
  icon: React.ComponentType<{ size?: number }>;
  text: string;
  position: string;
}) {
  const colorClass =
    color === "yellow"
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : color === "green"
        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
        : "bg-blue-100 text-blue-800 border-blue-200";

  return (
    <div
      className={`absolute ${position} p-4 w-48 rounded-lg shadow-xl border ${colorClass} z-10 hidden lg:block`}
    >
      <div className="mb-2 opacity-80">
        <Icon size={20} />
      </div>
      <p className="text-sm font-medium leading-tight">{text}</p>
    </div>
  );
}

function StatBadge({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-full shadow-sm">
      <Icon size={16} className="text-blue-500" />
      <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">{text}</span>
    </div>
  );
}

export default function Page() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, [data-hover='true']")) {
        setCursorHover(true);
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, [data-hover='true']")) {
        setCursorHover(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div className="bg-[#f7f9fc] min-h-screen">
      <div
        aria-hidden
        className={`custom-cursor ${cursorHover ? "cursor-hover" : ""}`}
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      />
      <Navbar />

      <main className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(76,132,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(76,132,255,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 22px 22px, rgba(96,165,250,0.20) 1.8px, transparent 2.8px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-blue-200/30 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute right-[-120px] top-40 w-[320px] h-[320px] bg-violet-200/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute left-[-120px] bottom-20 w-[280px] h-[280px] bg-cyan-200/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_0.6px,transparent_0.6px)] [background-size:18px_18px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <StickyNote
            color="yellow"
            icon={Calendar}
            text="Les rappels de rendez-vous ont augmente de 42%"
            position="top-20 left-10"
          />
          <StickyNote
            color="green"
            icon={FileText}
            text="Paperasse reduite de 85%"
            position="bottom-40 left-20"
          />
          <StickyNote
            color="blue"
            icon={Users}
            text="Satisfaction des patients en hausse de 67%"
            position="bottom-20 right-10"
          />

          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-yellow-50 border border-yellow-100 rounded-full mb-10">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-yellow-800 uppercase tracking-wider">
                Approuve par de nombreux cabinets dentaires
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              Transformez votre <br />
              <span className="relative inline-block">
                Cabinet Dentaire
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 3 150 3 298 10"
                    stroke="#2563eb"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              avec une Gestion Intelligente
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed">
              Solution de gestion de cabinet tout-en-un concue specifiquement pour
              les professionnels dentaires. Rationalisez les operations et
              ameliorez les soins aux patients.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <StatBadge icon={ChevronRight} text="85% de planification plus rapide" />
              <StatBadge icon={Users} text="2,5x de fidelisation des patients" />
              <StatBadge icon={FileText} text="60% de paperasse en moins" />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter text-yellow-900 z-10 shadow-sm">
                  Essai Gratuit
                </div>
                <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all flex items-center gap-2 group active:scale-95">
                  Commencer gratuitement
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <button className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95 shadow-sm">
                <Play size={18} className="fill-slate-700" />
                Voir la demo
              </button>
            </div>
          </div>
        </div>
      </main>

      <section className="py-24 bg-[#f7f9fc] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-8">
                <Sparkles size={14} className="text-blue-600" />
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Solution tout-en-un</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Smart Triage for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Emergency</span>{" "}
                Departments
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">
                A touchscreen dashboard at the entrance of the emergency department that allows patients to quickly describe their condition using an interactive body map. Swift Triage automatically calculates urgency, reduces waiting times, and improves patient flow by routing cases to the correct department with intelligent triage scoring.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users size={14} className="text-blue-600" />
                  </div>
                  Visual Body Map
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Sparkles size={14} className="text-emerald-600" />
                  </div>
                  Smart Triage Scoring
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                    <ChevronRight size={14} className="text-violet-600" />
                  </div>
                  Automatic Routing
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-200/40 to-cyan-200/40 rounded-3xl blur-2xl pointer-events-none" />
              <img
                src="/image.png"
                alt="Swift Triage Emergency Dashboard"
                className="relative rounded-2xl shadow-2xl shadow-blue-200/50 border border-slate-100 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Planification Intelligente",
                desc: "Optimisez votre agenda avec notre IA qui reduit les temps morts.",
              },
              {
                title: "Dossiers Patients",
                desc: "Accedez instantanement a l'historique complet et aux radiographies.",
              },
              {
                title: "Facturation Automatisee",
                desc: "Gerez les paiements et les mutuelles en quelques clics.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:-translate-y-1 transition-transform"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Comment ca <span className="text-blue-600">marche</span>
            </h2>
            <p className="text-lg text-slate-500">
              Trois etapes simples pour transformer votre cabinet dentaire en une machine bien huilee.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Importez vos donnees",
                desc: "Migrez vos dossiers patients et votre planning en quelques minutes. Notre equipe vous accompagne gratuitement.",
              },
              {
                step: "02",
                title: "Personnalisez votre flux",
                desc: "Configurez les rappels automatiques, les fiches patients et la facturation selon vos besoins specifiques.",
              },
              {
                step: "03",
                title: "Optimisez chaque jour",
                desc: "Laissez l'IA reduire les temps morts, suivre les paiements et ameliorer la satisfaction de vos patients.",
              },
            ].map((item) => (
              <div key={item.step} className="relative p-8 bg-[#f7f9fc] rounded-2xl border border-slate-100">
                <span className="text-5xl font-black text-blue-100 absolute top-6 right-6">{item.step}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed relative">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Ils nous font <span className="text-blue-600">confiance</span>
            </h2>
            <p className="text-lg text-slate-500">
              Hundreds of emergency departments use Swift Triage daily to improve patient care and reduce wait times.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Amine Khelifi",
                role: "Cabinet dentaire, Alger",
                text: "Since we deployed Swift Triage, our triage time dropped by 40% and patient satisfaction increased significantly.",
              },
              {
                name: "Dr. Sarah Benali",
                role: "Chirurgien-dentiste, Oran",
                text: "La facturation automatique m'a fait gagner plus de 6 heures par semaine. Je peux enfin me concentrer sur mes patients.",
              },
              {
                name: "Dr. Karim Moussaoui",
                role: "Orthodontiste, Constantine",
                text: "L'interface est intuitive et le support client est repondre en moins de 5 minutes. Un outil indispensable.",
              },
            ].map((t) => (
              <div key={t.name} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "850+", label: "Cabinets actifs" },
              { value: "2.4M", label: "Rendez-vous geres" },
              { value: "99.9%", label: "Disponibilite" },
              { value: "4.9/5", label: "Note moyenne" },
            ].map((stat) => (
              <div key={stat.label} className="p-6">
                <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Pret a moderniser votre cabinet ?
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Rejoignez plus de 850 cabinets dentaires qui ont deja fait le saut. Essai gratuit de 14 jours, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2 active:scale-95">
              Commencer gratuitement
              <ChevronRight size={20} />
            </button>
            <button className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl border border-blue-500 hover:bg-blue-800 transition-all flex items-center gap-2 active:scale-95">
              <Play size={18} className="fill-white" />
              Voir la demo
            </button>
          </div>
        </div>
      </section>

      <footer className="py-16 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Stethoscope size={18} />
                </div>
                <span className="text-xl font-extrabold text-white">
                  dent<span className="text-blue-500">dz</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                La solution de gestion de cabinet dentaire moderne, concue pour les professionnels en Algerie et en Afrique du Nord.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalites</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mises a jour</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Communaute</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">A propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrieres</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partenaires</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p> Swift Triage. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Confidentialite</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
