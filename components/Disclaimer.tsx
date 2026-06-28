export default function Disclaimer() {
  return (
    <footer
      className="mt-12 py-6"
      style={{ borderTop: '1px solid rgba(22,36,29,0.06)', background: '#FBF5EC' }}
    >
      <div className="max-w-[1440px] mx-auto px-10 lg:px-12">
        <p className="text-xs text-center leading-relaxed max-w-2xl mx-auto" style={{ color: '#7A8077' }}>
          🛡️{' '}
          <strong style={{ color: '#5C635A' }}>Esta herramienta es educativa y de planificación.</strong>{' '}
          No constituye asesoramiento financiero. Las tasas son ilustrativas y editables; verifica siempre
          las condiciones reales y vigentes de cada producto directamente con las instituciones reguladas.
          La rentabilidad histórica no garantiza resultados futuros.
        </p>
      </div>
    </footer>
  );
}
