function setCounterEvents(counter, costElem) {
    let countElem = $(counter).find('.count')[0];
    let costOfOne = parseFloat(costElem.textContent)/(+$(countElem).text());

    $(counter).find('.plus').click(() => {
        let count = (+$(countElem).text()) + 1;
        $(countElem).text(count);
        $(costElem).text(costOfOne * count + ' $').trigger('change');
    });
    $(counter).find('.minus').click(() => {
        if (+$(countElem).text() <= 1) {
            return;
        }
        let count = (+$(countElem).text()) - 1;
        $(countElem).text(count);
        $(costElem).text(costOfOne * count + ' $').trigger('change');
        
    });
};