import { cApi, dApi } from "@/api/axios";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      const res = await cApi.post('/logout');
      if(res){
        localStorage.removeItem("token");
        toast("Logout Successful")
        navigate("/login");
      }
    } catch (error) {
      console.error('API B error:', error);
    } finally {
      setLoading(false);
    }
    
  }
  return (
    <div>
      homeapghe
        <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default HomePage