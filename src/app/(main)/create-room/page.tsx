import { CreateRoomForm } from "./form";

export default function LogoutPage() {
  return (
    <div className="container relative md:max-w-lg space-y-6 py-2 md:py-10">
      <h1 className="text-xl font-medium md:text-3xl text-center">
        Create your room
      </h1>
      <CreateRoomForm />
    </div>
  );
}
