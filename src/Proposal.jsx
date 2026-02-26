import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { supabase } from './supabaseClient'
import { Heart } from 'lucide-react'

export default function Proposal({ session }) {
    const [accepted, setAccepted] = useState(false)
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 })

    // 1. Logic to move the "No" button
    const moveNoButton = () => {
        const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100)
        const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100)
        setNoBtnPosition({ x, y })
    }

    // 2. Logic when "Yes" is clicked
    const handleYes = async () => {
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff69b4', '#ff0000', '#ffffff']
            })
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff69b4', '#ff0000', '#ffffff']
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }
        frame()

        setAccepted(true)

        // Save "YES" to Supabase
        if (session?.user) {
            try {
                await supabase.from('proposal_answers').insert([
                    { user_id: session.user.id, answer: 'YES' }
                ])
            } catch (error) {
                console.error("Error saving to database:", error)
            }
        }
    }

    // --- THE SUCCESS SCREEN (After clicking YES) ---
    if (accepted) {
        return (
            <div className="min-h-screen bg-[#fff0f5] py-10 px-4 overflow-y-auto">
                <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 text-center">

                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-pink-600 font-serif">
                            She Said Yes!
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 font-light italic">
                            My heart is yours, forever.
                        </p>
                    </motion.div>


                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="w-full relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
                    >
                        <img
                       src="data:image/jpeg;base64,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"
                            alt="Beautiful Flowers"
                            className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-pink-600 font-bold flex items-center gap-2">
                            <Heart className="fill-pink-600 w-5 h-5" /> For You
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="bg-white p-8 md:p-12 rounded-lg shadow-xl border border-pink-100 max-w-2xl w-full relative text-left"
                    >
                        <div className="font-serif text-gray-800 leading-relaxed space-y-6 text-lg">
                            <p className="font-bold text-2xl text-pink-500">My Dearest Love,</p>
                            <p>
                                I am so happy you are here. From the moment I first saw you, I knew there was something special about you. You bring so much light and joy into my life.
                            </p>
                            <p>
                                These flowers are just a small symbol of how beautiful you make my world. Thank you for saying yes, and thank you for being you.
                            </p>

                            <div className="pt-6 mt-6 border-t border-pink-100 flex flex-col items-end">
                                <span className="italic text-gray-500">With all my love,</span>
                                <span className="text-3xl text-pink-600 mt-2">Your Valentine</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        )
    }

    // --- THE INITIAL QUESTION SCREEN ---
    return (
        <div className="min-h-screen bg-[#fff0f5] flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center relative"
            >
                <img
                    className="h-[200px] mx-auto mb-6"
                    src="https://media.tenor.com/v06U8T2OQ8QAAAAi/mochi-mochi-peach-cat-cat.gif"
                    alt="Cute Cat"
                />
                <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-12 font-serif">
                    Will you be my Valentine? 🌹
                </h1>

                <div className="flex gap-8 justify-center items-center">
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleYes}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-bold shadow-xl text-xl transition-colors"
                    >
                        YES
                    </motion.button>

                    <motion.button
                        animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                        onMouseEnter={moveNoButton}
                        onClick={moveNoButton}
                        className="bg-gray-400 text-white px-10 py-4 rounded-full font-bold shadow-lg text-xl"
                    >
                        NO
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}