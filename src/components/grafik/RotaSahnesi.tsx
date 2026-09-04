import { RotaCizimi } from "./RotaCizimi";
import { DAR, GENIS } from "./rotaOlcu";

/** Aynı grafik iki ölçüde: dar ekranda yazılar okunaklı kalsın diye. */
export function RotaSahnesi() {
  return (
    <>
      <div className="sm:hidden">
        <RotaCizimi o={DAR} kimlik="dar" />
      </div>
      <div className="hidden sm:block">
        <RotaCizimi o={GENIS} kimlik="genis" />
      </div>
    </>
  );
}
