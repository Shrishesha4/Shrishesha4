"use client";

import { motion } from "framer-motion";
import GlitchText from "../ui/GlitchText";
import NeonButton from "../ui/NeonButton";

import SocialLinks from "../ui/SocialLinks";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl px-4">
        <div className="mb-12 text-center">
             <GlitchText text="ESTABLISH_UPLINK" size="lg" className="font-bold" />
             <p className="text-acid-green font-mono mt-2">// ENCRYPTED_CONNECTION_SECURE</p>
        </div>

        <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-panel-bg border border-neon-blue/30 p-8 rounded-lg relative overflow-hidden backdrop-blur-md mb-12"
        >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue"/>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-blue"/>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-blue"/>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue"/>

            <div className="space-y-6 font-mono">
                <div>
                    <label className="block text-neon-blue mb-2 text-sm">&gt; INPUT_ID_NAME</label>
                    <input type="text" className="w-full bg-darker-bg border border-white/10 p-3 focus:border-neon-pink focus:outline-none focus:box-glow transition-all text-white" placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-neon-blue mb-2 text-sm">&gt; INPUT_COMMS_ADDRESS</label>
                    <input type="email" className="w-full bg-darker-bg border border-white/10 p-3 focus:border-neon-pink focus:outline-none focus:box-glow transition-all text-white" placeholder="john@cyber.net" />
                </div>
                <div>
                    <label className="block text-neon-blue mb-2 text-sm">&gt; TRANSMISSION_DATA</label>
                    <textarea rows={5} className="w-full bg-darker-bg border border-white/10 p-3 focus:border-neon-pink focus:outline-none focus:box-glow transition-all text-white" placeholder="Enter message sequence..." />
                </div>

                <div className="flex justify-end pt-4">
                    <NeonButton type="submit" variant="primary">SEND_TRANSMISSION</NeonButton>
                </div>
            </div>
        </motion.form>

        <div className="text-center">
            <p className="text-neon-blue font-mono mb-4 text-sm">&lt; ALTERNATE_CHANNELS /&gt;</p>
            <SocialLinks />
        </div>
      </div>
    </section>
  );
}
