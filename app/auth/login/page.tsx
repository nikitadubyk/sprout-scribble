import { Routes } from "@/config";
import { AuthCard } from "@/components/auth/auth-card";

export default function Login() {
  return (
    <AuthCard
      showSocials
      title="Welcome back"
      backPath={Routes.Auth.Register}
      backButtonLabel="Create new account"
    >
      <div>HELLO</div>
    </AuthCard>
  );
}
