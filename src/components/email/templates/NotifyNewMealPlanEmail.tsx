import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  planId: number;
  trainerFirstName: string;
}

export const NotifyNewPlanEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  planId,
  trainerFirstName,
}) => (
  <div>
    <h1>Hey, {firstName}!</h1>

    <p>
      Check out your new plan here {`https://grohealth.co/app/plans/${planId}`}
    </p>

    <p>Thanks,{trainerFirstName}</p>
  </div>
);
