import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CUSTOMER_FEEDBACK } from '@/lib/constants';

export default function FeedbackSection() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <h2 className="font-coiny text-section-title text-center mb-12 gradient-text">
          Customer Feedback ⭐
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_FEEDBACK.map((feedback) => (
            <Card key={feedback.id} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={feedback.avatar}
                    alt={feedback.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{feedback.name}</h4>
                    <div className="flex items-center">
                      {Array.from({ length: feedback.rating }, (_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">"{feedback.comment}"</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Product: {feedback.product}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}