(function () {
  var MIN_CLP = 4750;
  var slider = document.getElementById('dep-slider');
  var depVal = document.getElementById('dep-val');
  var bonusTotal = document.getElementById('bonus-total');
  var bonusBank = document.getElementById('bonus-bank');
  var bonusGiros = document.getElementById('bonus-giros');
  if (!slider || !depVal || !bonusTotal) return;

  function fmtClp(n) {
    return '$' + Math.round(n).toLocaleString('es-CL') + ' CLP';
  }

  function update() {
    var clp = Number(slider.value);
    var eligible = clp >= MIN_CLP;
    var bonusClp = eligible ? clp : 0;
    var totalClp = clp + bonusClp;
    depVal.textContent = fmtClp(clp);
    bonusTotal.textContent = fmtClp(totalClp);
    if (bonusBank) {
      bonusBank.textContent = eligible
        ? fmtClp(bonusClp) + ' de bono'
        : 'Depósito mínimo $4.750 CLP para el bono';
    }
    if (bonusGiros) bonusGiros.hidden = !eligible;
  }

  slider.addEventListener('input', update);
  update();
})();
