"use client";

import { useEffect, useState } from "react";
import { getGuideByPath } from "@/lib/index";
import { HowToGuide } from "@/interfaces";
import { useRouter } from "next/navigation";
import Head from "next/head";
import CustomMarkdown from "@/components/custom-markdown";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function HowToGuideDetail({ params }: { params: { guide_name: string } }) {
  const router = useRouter();

  const [guideDetails, setGuideDetails] = useState<HowToGuide | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { toast } = useToast();

  useEffect(() => {
    if (!params.guide_name) {
      toast({
        title: "Oops!",
        description: "Not found",
      });

      router.push("/guide");
      return;
    }

    const fetchGuide = async () => {
      try {
        const fetchedGuide = await getGuideByPath(params.guide_name);
        setGuideDetails(fetchedGuide.data);
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Oops!",
          description: error.message,
        });
        router.push("/guide");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuide();
  }, [params.guide_name, router, toast]);

  return (
    <div className="container mx-auto p-5 sm:p-10">
      <Head>
        {guideDetails && (
          <>
            <title>{guideDetails.metadata.title}</title>
            <meta name="description" content={guideDetails.content.substring(0, 150) + " ..."} />
          </>
        )}
      </Head>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="text-center mb-10">
            <h1 className="mb-3 text-lg sm:text-xl lg:text-2xl">&ldquo;MakeMeDIYspire&rdquo; Guides</h1>
          </div>

          {guideDetails && (
            <div className="w-full p-4">
              <CustomMarkdown content={guideDetails.content} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
