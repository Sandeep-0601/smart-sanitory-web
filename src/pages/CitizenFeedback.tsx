import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Camera, CheckCircle, MapPin, Upload } from 'lucide-react';

export default function CitizenFeedback() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="bg-blue-600 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          <h1 className="text-2xl font-bold mb-1 relative z-10">Rate This Facility</h1>
          <p className="text-blue-100 flex items-center justify-center gap-1.5 text-sm relative z-10">
            <MapPin className="w-4 h-4" /> Airport Terminal 1
          </p>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-lg font-bold mb-4">How clean was the toilet?</h2>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star className={`w-10 h-10 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300 dark:text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Select Issue (Optional)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['No Toilet Paper', 'Wet Floor', 'Bad Odour', 'Dustbin Full', 'No Water', 'Broken Lock'].map(issue => (
                      <button key={issue} className="border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-500 hover:text-blue-600 transition-colors">
                        {issue}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Additional Comments</label>
                  <textarea 
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Tell us more about your experience..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setStep(2)}
                    disabled={rating === 0}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      rating > 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Submit Feedback
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-emerald-500" />
                </motion.div>
                <h2 className="text-2xl font-bold">Thank You!</h2>
                <p className="text-slate-500">Your feedback has been sent directly to the maintenance team and helps us keep our city clean.</p>
                <button 
                  onClick={() => setStep(1)}
                  className="mt-6 text-blue-600 font-medium hover:underline"
                >
                  Submit another response
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </div>
      <p className="mt-8 text-sm text-slate-400 font-medium">Powered by SmartSan City Systems</p>
    </div>
  );
}
