import { useEffect, useRef, useState } from 'react';
import { Check, Crown } from 'lucide-react';
import { Button } from './ui/button';
import styles from './HeroSection.module.css';
import Testimonials from './Testimonials';
import { toast } from 'react-toastify';

interface Plan {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string | number;
  currency: string;
  interval: string | null;
  interval_count: number;
  duration_days: number;
}

interface Subscription {
  id: number;
  plan_name: string;
  plan_id: number;
  status: string;
  amount: string;
  currency: string;
}

const Plans = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [userSubscription, setUserSubscription] = useState<Subscription | null>(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/v1/plans`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setPlans(data);
        } else {
          toast.error("Invalid plans data format");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    const fetchSubscription = async () => {
      const userData = JSON.parse(localStorage.getItem('onegrab_user') || '{}');
      const token = userData.token;
      if (!token) return;

      try {
        const res = await fetch(`${apiBaseUrl}/api/v1/subscription`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setUserSubscription(data);
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };

    fetchPlans();
    const userData = JSON.parse(localStorage.getItem('onegrab_user') || '{}');
    const token = userData.token;

    if (token) {
      fetchSubscription();
    }
  }, [apiBaseUrl]);

  const handleChoosePlan = async (planId: number) => {
    const userData = JSON.parse(localStorage.getItem('onegrab_user') || '{}');
    const token = userData.token;

    if (!token) {
      toast.error("Please login to subscribe");
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/v1/subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ plan_id: planId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.error?.includes("pending subscription")) {
          const userConfirmed = window.confirm(
            errorData.error + "\n\nDo you want to cancel your existing pending subscription and switch to this new plan?"
          );

          if (userConfirmed) {
            const cancelRes = await fetch(`${apiBaseUrl}/api/v1/subscription/cancel`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            });

            if (cancelRes.ok) {
              toast.success("Old subscription cancelled. Now creating new subscription...");
              return handleChoosePlan(planId);
            } else {
              toast.error("Failed to cancel current subscription");
            }
          }
          return;
        }

        throw new Error(errorData.error || "Failed to subscribe");
      }

      toast.success("Subscription request submitted! You'll get access once admin approves.");

      const subRes = await fetch(`${apiBaseUrl}/api/v1/subscription`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (subRes.ok) {
        const subData = await subRes.json();
        setUserSubscription(subData.subscription);
      }

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <>
      <section id="plans" ref={sectionRef} className={`${styles.pricingBg} py-24`}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton text-text-black mb-6 tracking-extra-wide">
              FLEXIBLE PLANS FOR EVERY
              <br />
              LEARNER'S JOURNEY
            </h2>
            <p className="text-xl text-text-gray max-w-3xl mx-auto font-medium leading-relaxed">
              Choose the perfect plan that fits your learning goals and budget
            </p>
          </div>

          {loading ? (
            <div className="text-center text-lg text-text-gray">Loading plans...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => {
                const isUserPlan = Number(userSubscription?.plan_id) === Number(plan.id);
                const normalizedStatus = userSubscription?.status?.trim().toLowerCase();
                const isPending = normalizedStatus === "pending" && isUserPlan;
                const isActive = normalizedStatus === "active" && isUserPlan;

                return (
                  <div
                    key={plan.id}
                    className={`relative bg-white rounded-3xl border-2 shadow-xl transition-all duration-700 
                      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                      ${isUserPlan ? 'opacity-60 pointer-events-none' : 'hover:scale-105 hover:border-primary/50'}
                    `}
                    style={{ transitionDelay: `${index * 0.2}s` }}
                  >
                    {(isPending || isActive) && (
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                          isActive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {isActive ? 'Subscribed' : 'Pending'}
                      </div>
                    )}

                    {index === 1 && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <div className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                          <Crown className="w-4 h-4 fill-current" />
                          <span>MOST POPULAR</span>
                        </div>
                      </div>
                    )}

                    <div className="p-8">
                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-anton text-text-black mb-3 tracking-wide">
                          {plan.name.toUpperCase()}
                        </h3>
                        <p className="text-text-gray mb-6 leading-relaxed">
                          {plan.description}
                        </p>
                        <div className="flex items-baseline justify-center mb-2">
                          <span className="text-4xl font-bold text-text-black">
                            ₹{plan.price}
                          </span>
                          <span className="text-xl text-text-gray ml-2">
                            /{plan.interval || 'month'}
                          </span>
                        </div>
                        <div className="text-sm text-text-gray">
                          Billed monthly, cancel anytime
                        </div>
                      </div>

                      <Button
                        disabled={isActive}
                        className="w-full py-4 text-lg font-bold transition-all duration-300 rounded-xl bg-primary text-white hover:bg-primary-dark shadow-lg disabled:opacity-60"
                        onClick={() => handleChoosePlan(plan.id)}
                      >
                        {isActive ? 'Subscribed' : `Choose ${plan.name}`}
                      </Button>

                      <ul className="space-y-4 mt-8">
                        <li className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span className="text-text-gray leading-relaxed">All standard features</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span className="text-text-gray leading-relaxed">Unlimited course access</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span className="text-text-gray leading-relaxed">Certificate upon completion</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                          <span className="text-text-gray leading-relaxed">Community support</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-16">
            <p className="text-lg text-text-gray mb-4">
              All plans include a 7-day free trial. No credit card required.
            </p>
            <p className="text-sm text-text-gray">
              ✓ Cancel anytime ✓ 30-day money-back guarantee ✓ No setup fees
            </p>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
};

export default Plans;
