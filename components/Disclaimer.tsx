export default function Disclaimer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-12 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-xs text-gray-400 text-center leading-relaxed max-w-2xl mx-auto">
          🛡️{' '}
          <strong className="text-gray-500">Esta herramienta es educativa y de planificación.</strong>{' '}
          No constituye asesoramiento financiero. Las tasas son ilustrativas y editables; verifica siempre
          las condiciones reales y vigentes de cada producto directamente con las instituciones reguladas.
          La rentabilidad histórica no garantiza resultados futuros.
        </p>
      </div>
    </footer>
  );
}
