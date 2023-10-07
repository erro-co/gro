import { NotifyNewPlanEmail } from "@/components/email/templates/NotifyNewMealPlanEmail";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // const body = await req.json();
    // const { planId, firstName, trainerFirstName, clientEmail } = body;
    const { data } = await request.json();

        // from: "Gro Team <team@grohealth.co>",
      // to: [data.clientEmail],
      // subject: "GRO: You have a new Meal Plan available!",
      // react: NotifyNewPlanEmail({
      //   firstName: data.firstName,
      //   planId: data.planId,
      //   trainerFirstName: data.trainerFirstName,
      // }),
    

      const email = await resend.emails.send({
        from: "Gro Team <team@grohealth.co>",
        to: [data.clientEmail],
        subject: "GRO: You have a new Meal Plan available!",
        text: "Your new meal plan is now available. Please check the attached details.", 
        react: NotifyNewPlanEmail({
          firstName: data.firstName,
          planId: data.planId,
          trainerFirstName: data.trainerFirstName,
        }),
      });
      

    return NextResponse.json(email);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
