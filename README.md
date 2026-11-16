# Solar da Castanha — Forest House
> Souto do Concelho, Manteigas, Serra da Estrela, Portugal  
> Registo Nacional de Empreendimentos Turísticos (RNET): **Nº 8443**

Protótipo interativo desenvolvido segundo os **Padrões Oficiais de Identidade e Design Bruto**, tomando como base a arquitetura e solidez do modelo da Quinta do Olival e recriando integralmente o branding com fundamentação histórica, botânica, territorial e gastronómica.

---

## 1. Fundamentação do Branding & Razão de Cada Escolha

No padrão Bruto, **nada é colocado ao acaso — cada detalhe tem uma razão de existir**:

| Elemento | Decisão de Design | Fundamentação Histórica e Territorial |
| :--- | :--- | :--- |
| **Denominação Limpa** | `Solar da Castanha` | Respeita a traça do alojamento e evita ruído corporativo ou burocrático no topo. |
| **Ancoragem Geográfica** | `Manteigas, Guarda` | Posicionada por baixo do logótipo em tom neutro discreto (Regra 10), reforçando o pertencimento ao coração do Parque Natural da Serra da Estrela. |
| **Paleta Cromática** | `#5C3A21` (Castanho Castanheiro) | Inspirada na madeira nobre de castanho, nos troncos centenários do souto e na casca da castanha. |
| **Tom Secundário** | `#B87326` (Âmbar Outonal / Ouro do Mel) | Reflete o tom dourado das folhas na Rota das Faias no outono e o mel de urze e castanheiro característico da serra. |
| **Tom de Contraste** | `#2B3E2F` (Verde Florestal Serra) | Evoca a densa vegetação de coníferas e folhosas que margeia a Ribeira de Leandres e o Vale Glaciar. |
| **Fundos e Linho** | `#FAF7F2` (Pedra de Granito Suave) | Remete para a cantaria em granito original da casa e os têxteis de lã e burel tradicionais de Manteigas. |
| **Símbolo Botânico** | Folha de *Castanea sativa* + Ouriço | Vetor estilizado com traço fino e elegante (sem emojis), celebrando a espécie arbórea que dá nome à casa. |
| **Acolhimento Humano** | D. Ilda e Sr. Alberto | Anfitriões reais conhecidos pela receção calorosa, lareira acesa, partilha de dicas sobre trilhos e compotas caseiras. |

---

## 2. Acomodações Reais & Tipologias

Inspiradas na fauna do Parque Natural da Serra da Estrela e na história da antiga casa do guarda-florestal (outubro de 1888):

1. **Suite Tentilhão (~26 m²)**:
   - A suite nobre de montanha com cama king-size, vigas em madeira de castanho, salamandra aconchegante e varanda panorâmica sobre o souto secular.
   - Capacidade para até 4 pessoas (cama casal + individual). Desde 125 € / noite.
2. **Quarto Esquilo (~15 m²)**:
   - Paredes originais em granito de 1888, detalhes em bétula e têxteis de burel da fábrica de Manteigas, com recanto de leitura sobre a copa das árvores onde habitam os esquilos vermelhos.
   - Capacidade para até 4 pessoas. Desde 95 € / noite.
3. **Quarto Raposa (~12 m²)**:
   - Quarto intimista e sereno com excelente isolamento térmico em lã da serra, adormecendo ao som límpido da Ribeira de Leandres.
   - Capacidade para até 3 pessoas. Desde 85 € / noite.

*Todas as diárias incluem Pequeno-Almoço Serrano de montanha.*

---

## 3. Curadoria de Experiências com Tempos Reais

Tempos e distâncias calculados a partir da localização real em Souto do Concelho, Manteigas:

- **Cascata do Poço do Inferno**: ~3,8 km • 6 min do Solar (na mesma estrada florestal)
- **Rota das Faias de São Lourenço**: ~4,5 km • 8 min do Solar
- **Vila de Manteigas & Burel Factory**: ~2,5 km • 5 min do Solar
- **Vale Glaciar do Zêzere & Covão da Ametade**: ~9 km • 12 min do Solar
- **Torre & Maciço Central**: ~22 km • 28 min do Solar

---

## 4. Conformidade com os Padrões Bruto

- **Sem Emojis**: Ícones 100% vetoriais em traço fino (`stroke-width: 1.5` a `2`).
- **Composição Hero (Above the Fold)**: Ocupação integral da primeira dobra com barra de disponibilidade direta na base.
- **Botão CTA Condicionado ao Scroll**: Entra no cabeçalho apenas quando a barra de pesquisa sai do ecrã.
- **Cartões de Experiências Limpos**: Fotografias sem tags flutuantes sobrepostas e distâncias alinhadas com o título na mesma linha.
- **FAQs + Formulário Sticky**: Acordeão à esquerda e cartão de contacto direto com D. Ilda & Sr. Alberto à direita fixo ao scroll.
- **Página de Reservas (`reservas.html`)**:
  - Bloco de faturação com checkbox opcional para contribuinte (NIF).
  - Pagamento seguro imediato: Cartão de Crédito/Débito, MB WAY instantâneo e Referência Multibanco gerada na hora.
  - Resumo lateral fixo com cálculo dinâmico de noites e total.
  - Confirmação com botão direto para WhatsApp com os anfitriões.

---

## 5. Execução Local

```bash
# Iniciar o servidor HTTP local
node serve.cjs
```
- Website: `http://localhost:5174/index.html`
- Reservas: `http://localhost:5174/reservas.html`
