
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useClickSound } from "@/hooks/use-click-sound";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import { BentoGrid, BentoCard } from "@/components/BentoCards";
import {
  FadeInUp,
  BounceIn,
  WiggleIcon,
  TiltCard,
  FloatingElement,
} from "@/components/AnimatedElements";
import {
  Sparkles,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Palette,
  Layers,
  Clock,
  DollarSign,
  Wand2,
  Rocket,
  Star,
  Heart,
  Globe,
  Calendar,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { AuthModal } from "@/components/AuthModal";
import { FileUploadZone } from "@/components/FileUploadZone";
import { useAuth } from "@/hooks/useAuth";
import { useProjectSubmission } from "@/hooks/useProjectSubmission";
import { toast } from "sonner";

const StartProject = () => {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { playClickSound, playHoverSound } = useClickSound();
  const { user } = useAuth();
  const { submitProject, loading } = useProjectSubmission();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    style: "",
    timeline: "",
    budget: "",
    budgetAmount: [500],
    files: [] as File[],
  });

  const projectTypes = [
    {
      id: "photoshop",
      title: "Photoshop Request",
      description: "Photo editing, compositing, digital art",
      icon: Palette,
      gradient: "from-retro-purple to-retro-teal",
    },
    {
      id: "3d",
      title: "3D Request",
      description: "3D modeling, rendering, visualization",
      icon: Layers,
      gradient: "from-retro-teal to-retro-mint",
    },
    {
      id: "design",
      title: "Design Request",
      description: "Logos, branding, graphic design",
      icon: Sparkles,
      gradient: "from-retro-orange to-retro-peach",
    },
    {
      id: "website",
      title: "Website Request",
      description: "Web design, UI/UX, landing pages",
      icon: Globe,
      gradient: "from-retro-pink to-retro-lavender",
    },
  ];

  const handleFileUpload = (files: File[]) => {
    setFormData({ ...formData, files });
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!projectType || !formData.projectName || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await submitProject({
        projectType,
        projectName: formData.projectName,
        description: formData.description,
        style: formData.style,
        timeline: formData.timeline,
        budget: formData.budget,
        files: formData.files,
      }, user.id);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Retry submission after authentication
    setTimeout(() => {
      handleSubmit();
    }, 500);
  };

  const isStepValid = (stepNum: number) => {
    switch (stepNum) {
      case 1: return !!projectType;
      case 2: return !!(formData.projectName && formData.description && formData.style);
      case 3: return !!(formData.timeline && formData.budget);
      case 4: return true; // Files are optional
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-retro-cream via-retro-lavender/20 to-retro-mint/30 relative overflow-hidden">
      {/* Floating background elements */}
      <FloatingElement className="absolute top-20 left-10 w-20 h-20 bg-retro-pink/20 rounded-full blur-xl" />
      <FloatingElement className="absolute top-40 right-20 w-16 h-16 bg-retro-teal/30 rounded-full blur-lg" />
      <FloatingElement className="absolute bottom-20 left-1/4 w-12 h-12 bg-retro-orange/20 rounded-full blur-md" />

      <Navigation />

      <div className="px-4 md:px-6 py-8 md:py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <BounceIn className="text-center mb-8 md:mb-12">
            <motion.div
              className="inline-flex items-center space-x-2 bg-retro-purple/10 px-4 py-2 rounded-full mb-4 md:mb-6"
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <WiggleIcon>
                <Zap className="w-4 h-4 text-retro-purple" />
              </WiggleIcon>
              <span className="text-sm font-medium text-retro-purple">
                AI-Powered Brief Generator
              </span>
            </motion.div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-retro-purple mb-4">
              Start Your Design Project
            </h1>
            <p className="text-lg md:text-xl text-retro-purple/80 max-w-2xl mx-auto px-4">
              Our intelligent system will help you create the perfect project
              brief for our expert designers! ✨
            </p>
          </BounceIn>

          {/* Progress Bar */}
          <FadeInUp delay={0.2} className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-4 px-4">
              {[1, 2, 3, 4].map((num) => (
                <motion.div
                  key={num}
                  className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-bold text-sm transition-all duration-300 ${
                    step >= num
                      ? "bg-retro-purple text-white"
                      : "bg-retro-purple/20 text-retro-purple/60"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={step === num ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: step === num ? 2 : 0 }}
                >
                  {step > num ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.div>
                  ) : (
                    num
                  )}
                </motion.div>
              ))}
            </div>
            <div className="w-full bg-retro-purple/20 rounded-full h-2 md:h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-retro-purple to-retro-teal h-2 md:h-3 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </FadeInUp>

          {/* Step Content */}
          <TiltCard className="border-3 border-retro-purple/30 bg-white/60 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Step 1: Project Type */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BounceIn>
                    <h2 className="font-display text-2xl md:text-3xl text-retro-purple mb-3 text-center">
                      What type of design magic do you need? 🎨
                    </h2>
                    <p className="text-retro-purple/80 text-center mb-6 md:mb-8 px-4">
                      Choose the service that best fits your project needs
                    </p>
                  </BounceIn>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {projectTypes.map((type, index) => (
                      <motion.div
                        key={type.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          playClickSound();
                          setProjectType(type.id);
                        }}
                        onMouseEnter={() => {
                          playHoverSound();
                        }}
                        className="cursor-pointer"
                      >
                        <TiltCard
                          className={`transition-all duration-300 border-3 hover:shadow-xl ${
                            projectType === type.id
                              ? "border-retro-purple bg-retro-purple/10 shadow-2xl"
                              : "border-retro-purple/30 hover:border-retro-purple/60"
                          }`}
                        >
                          <Card className="border-0 bg-transparent">
                            <CardContent className="p-4 md:p-6 text-center">
                              <motion.div
                                className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${type.gradient} rounded-3xl mx-auto mb-4 flex items-center justify-center`}
                                whileHover={{
                                  rotate: 360,
                                  scale: 1.1,
                                }}
                                transition={{ duration: 0.6 }}
                              >
                                <type.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                              </motion.div>
                              <h3 className="font-bold text-lg md:text-xl text-retro-purple mb-2">
                                {type.title}
                              </h3>
                              <p className="text-sm text-retro-purple/70">
                                {type.description}
                              </p>
                              {projectType === type.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="mt-3"
                                >
                                  <CheckCircle className="w-6 h-6 text-retro-purple mx-auto" />
                                </motion.div>
                              )}
                            </CardContent>
                          </Card>
                        </TiltCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BounceIn>
                    <h2 className="font-display text-2xl md:text-3xl text-retro-purple mb-3 text-center">
                      Tell us about your amazing project! 🚀
                    </h2>
                    <p className="text-retro-purple/80 text-center mb-6 md:mb-8 px-4">
                      The more details you share, the better we can match you
                      with the perfect designer
                    </p>
                  </BounceIn>

                  <div className="space-y-6 md:space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label
                        htmlFor="projectName"
                        className="text-retro-purple font-bold text-base md:text-lg mb-3 block"
                      >
                        Project Name ✨ <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="projectName"
                        placeholder="e.g., Logo for tech startup that'll change the world!"
                        value={formData.projectName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectName: e.target.value,
                          })
                        }
                        className="border-3 border-retro-purple/30 focus:border-retro-purple rounded-2xl py-3 text-base md:text-lg"
                        maxLength={100}
                        required
                      />
                      <div className="text-right text-sm text-retro-purple/60 mt-1">
                        {formData.projectName.length}/100
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label
                        htmlFor="description"
                        className="text-retro-purple font-bold text-base md:text-lg mb-3 block"
                      >
                        Project Description 📝 <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your vision, goals, and any specific requirements. Don't hold back - we love creative details!"
                        rows={5}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="border-3 border-retro-purple/30 focus:border-retro-purple rounded-2xl resize-none text-base md:text-lg"
                        maxLength={1000}
                        required
                      />
                      <div className="text-right text-sm text-retro-purple/60 mt-1">
                        {formData.description.length}/1000
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label className="text-retro-purple font-bold text-base md:text-lg mb-3 block">
                        Style Preference 🎨 <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.style}
                        onValueChange={(value) =>
                          setFormData({ ...formData, style: value })
                        }
                        required
                      >
                        <SelectTrigger className="border-3 border-retro-purple/30 rounded-2xl py-3 text-base md:text-lg">
                          <SelectValue placeholder="Choose your vibe!" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">
                            Modern & Clean 🏢
                          </SelectItem>
                          <SelectItem value="retro">
                            Retro & Vintage 📼
                          </SelectItem>
                          <SelectItem value="playful">
                            Playful & Fun 🎈
                          </SelectItem>
                          <SelectItem value="professional">
                            Professional & Corporate 💼
                          </SelectItem>
                          <SelectItem value="artistic">
                            Artistic & Creative 🎭
                          </SelectItem>
                          <SelectItem value="minimalist">
                            Minimalist 🕳️
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Timeline & Budget */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BounceIn>
                    <h2 className="font-display text-2xl md:text-3xl text-retro-purple mb-3 text-center">
                      Timeline & Budget Magic! ⏰💰
                    </h2>
                    <p className="text-retro-purple/80 text-center mb-6 md:mb-8 px-4">
                      Help us understand your project constraints so we can work
                      our magic perfectly
                    </p>
                  </BounceIn>

                  <div className="space-y-8 md:space-y-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label className="text-retro-purple font-bold text-lg md:text-xl mb-4 md:mb-6 block flex items-center">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                        When do you need this completed? 🏃‍♂️
                      </Label>
                      <RadioGroup
                        value={formData.timeline}
                        onValueChange={(value) =>
                          setFormData({ ...formData, timeline: value })
                        }
                        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                      >
                        {[
                          {
                            value: "rush",
                            title: "Rush (24h) ⚡",
                            description: "Need it yesterday? We got you!",
                            emoji: "🚀",
                          },
                          {
                            value: "standard",
                            title: "Standard (3-5 days) 📅",
                            description: "Perfect balance of speed & quality",
                            emoji: "⭐",
                          },
                          {
                            value: "flexible",
                            title: "Flexible (1-2 weeks) 🌱",
                            description: "No rush, take your time",
                            emoji: "🌸",
                          },
                          {
                            value: "large",
                            title: "Large Project (2-4 weeks) 🏗️",
                            description: "Complex masterpiece incoming",
                            emoji: "🎨",
                          },
                        ].map((option, index) => (
                          <motion.div
                            key={option.value}
                            className="flex items-center space-x-3 p-4 md:p-6 border-3 border-retro-purple/30 rounded-2xl hover:border-retro-purple/60 transition-all duration-300 hover:shadow-lg cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                            />
                            <div className="text-2xl md:text-3xl">{option.emoji}</div>
                            <Label
                              htmlFor={option.value}
                              className="flex-1 cursor-pointer"
                            >
                              <div className="font-bold text-retro-purple text-base md:text-lg">
                                {option.title}
                              </div>
                              <div className="text-sm md:text-base text-retro-purple/70">
                                {option.description}
                              </div>
                            </Label>
                          </motion.div>
                        ))}
                      </RadioGroup>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label className="text-retro-purple font-bold text-lg md:text-xl mb-4 md:mb-6 block flex items-center">
                        <DollarSign className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                        What's your budget range? 💸
                      </Label>
                      
                      {/* Budget Slider */}
                      <div className="mb-6 p-4 md:p-6 border-3 border-retro-purple/30 rounded-2xl bg-retro-purple/5">
                        <div className="mb-4">
                          <Label className="text-retro-purple font-medium text-base md:text-lg">
                            Custom Budget: ${formData.budgetAmount[0]}
                          </Label>
                        </div>
                        <Slider
                          value={formData.budgetAmount}
                          onValueChange={(value) => setFormData({ ...formData, budgetAmount: value })}
                          max={2000}
                          min={50}
                          step={25}
                          className="w-full mb-2"
                        />
                        <div className="flex justify-between text-sm text-retro-purple/60">
                          <span>$50</span>
                          <span>$2000+</span>
                        </div>
                      </div>

                      <RadioGroup
                        value={formData.budget}
                        onValueChange={(value) =>
                          setFormData({ ...formData, budget: value })
                        }
                        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                      >
                        {[
                          {
                            value: "50-150",
                            title: "$50 - $150 💫",
                            description: "Perfect for basic magic",
                            emoji: "✨",
                          },
                          {
                            value: "150-300",
                            title: "$150 - $300 🌟",
                            description: "Standard wizardry level",
                            emoji: "🎯",
                          },
                          {
                            value: "300-500",
                            title: "$300 - $500 🔥",
                            description: "Premium spell casting",
                            emoji: "💎",
                          },
                          {
                            value: "500+",
                            title: "$500+ 🚀",
                            description: "Master-level sorcery",
                            emoji: "👑",
                          },
                        ].map((option, index) => (
                          <motion.div
                            key={option.value}
                            className="flex items-center space-x-3 p-4 md:p-6 border-3 border-retro-purple/30 rounded-2xl hover:border-retro-purple/60 transition-all duration-300 hover:shadow-lg cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                            />
                            <div className="text-2xl md:text-3xl">{option.emoji}</div>
                            <Label
                              htmlFor={option.value}
                              className="flex-1 cursor-pointer"
                            >
                              <div className="font-bold text-retro-purple text-base md:text-lg">
                                {option.title}
                              </div>
                              <div className="text-sm md:text-base text-retro-purple/70">
                                {option.description}
                              </div>
                            </Label>
                          </motion.div>
                        ))}
                      </RadioGroup>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: File Upload */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BounceIn>
                    <h2 className="font-display text-2xl md:text-3xl text-retro-purple mb-3 text-center">
                      Share Your Inspiration! 📁✨
                    </h2>
                    <p className="text-retro-purple/80 text-center mb-6 md:mb-8 px-4">
                      Upload any reference materials, existing files, or
                      inspiration that'll help us create magic! (Optional)
                    </p>
                  </BounceIn>

                  <FileUploadZone
                    files={formData.files}
                    onFilesChange={handleFileUpload}
                    maxFiles={10}
                    maxSizeMB={10}
                    acceptedTypes={['image/*', '.pdf', '.doc', '.docx', '.txt', '.psd', '.ai', '.sketch', '.fig']}
                  />
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div
                className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12 pt-6 md:pt-8 border-t-2 border-retro-purple/20 gap-4 md:gap-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto"
                >
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="w-full md:w-auto border-2 border-retro-purple text-retro-purple hover:bg-retro-purple hover:text-white font-semibold px-6 py-3 rounded-2xl"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                </motion.div>

                {step < 4 ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto"
                  >
                    <Button
                      onClick={nextStep}
                      disabled={!isStepValid(step)}
                      className="w-full md:w-auto bg-gradient-to-r from-retro-orange to-retro-peach text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto"
                  >
                    <Button 
                      onClick={handleSubmit}
                      disabled={loading || !isStepValid(step)}
                      className="w-full md:w-auto bg-gradient-to-r from-retro-purple to-retro-teal text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg animate-pulse-glow"
                    >
                      <WiggleIcon>
                        <Rocket className="w-5 h-5 mr-2" />
                      </WiggleIcon>
                      {loading ? "Submitting..." : "Submit Project Magic!"}
                      <CheckCircle className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </TiltCard>

          {/* Help Section */}
          <FadeInUp delay={0.6} className="mt-8 md:mt-12 text-center">
            <TiltCard className="border-3 border-retro-teal/30 bg-retro-teal/10 backdrop-blur-sm rounded-2xl">
              <Card className="border-0 bg-transparent">
                <CardContent className="p-6 md:p-8">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Wand2 className="w-10 h-10 md:w-12 md:h-12 text-retro-teal mx-auto mb-4" />
                  </motion.div>
                  <h3 className="font-bold text-xl md:text-2xl text-retro-purple mb-3">
                    Need Help Getting Started? 🤝
                  </h3>
                  <p className="text-retro-purple/80 mb-6 text-base md:text-lg">
                    Our team of design wizards is here to help you create the
                    perfect project brief!
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      asChild
                      variant="outline"
                      className="border-2 border-retro-teal text-retro-teal hover:bg-retro-teal hover:text-white font-bold px-6 md:px-8 py-3 rounded-2xl"
                    >
                      <Link to="/contact">
                        <Heart className="w-4 h-4 mr-2" />
                        Contact Our Magic Team
                      </Link>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </TiltCard>
          </FadeInUp>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default StartProject;
