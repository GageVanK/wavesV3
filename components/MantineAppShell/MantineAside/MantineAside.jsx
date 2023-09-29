import { useEffect ,useState } from "react";
import { getExchangeRates } from "deso-protocol";
import { Text, Divider, Space} from "@mantine/core";

export function MantineAside() {

    const [desoPrice, setDesoPrice] = useState(0);
    const nanosPerDeSo = 0.000000001
    
    const getDesoRate = async () => {
     
    const exchangeRateData = await getExchangeRates({
      PublicKeyBase58Check: "BC1YLjYHZfYDqaFxLnfbnfVY48wToduQVHJopCx4Byfk4ovvwT6TboD",
    });

    const desoPriceInDollars = exchangeRateData.USDCentsPerDeSoCoinbase / 100;
    setDesoPrice(desoPriceInDollars);  

    }
   
  useEffect(() => { 
    getDesoRate();
  }, []);

    return(
<>
<Space h='xs'/>
<Text fz="xl" align='center'>$DESO Exchange Rate</Text>
        
<Space h='xs'/>   
          <Text fw={500} c='dimmed' align='center'>1 $DESO = ${desoPrice} USD</Text>
          <Divider my="sm" />
</>

    )
}