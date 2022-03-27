/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    let dom_elem;
    for (let i = 0; i < count; i++) {
        dom_elem = document.createElement(tag);
        dom_elem.innerHTML = content;
        document.body.appendChild(dom_elem);
    }
    return document;
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
function addChildrenToTree(elem, children_count, curent_level, level) {
    let child1 = document.createElement('div'),
        child_cache = [];
    child1.classList.add('item_' + curent_level);
    for (let i = 0; i < children_count; i++) {
        child_cache[i] = child1.cloneNode();
        if (curent_level !== level) {
            child_cache[i] = addChildrenToTree(
                child_cache[i],
                children_count,
                curent_level + 1,
                level,
            );
        }
        elem.appendChild(child_cache[i]);
    }
    return elem;
}
export function generateTree(children_count, level) {
    let parent = document.createElement('div');
    parent.classList.add('item_' + 1);
    parent = addChildrenToTree(parent, children_count, 2, level);
    return parent;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let div = generateTree(2, 3),
        section;
    const leve_2_cache = div.getElementsByClassName('item_2');
    for (let i = 0; i < leve_2_cache.length; i++) {
        section = document.createElement('section');
        section.setAttribute('class', leve_2_cache[i].getAttribute('class'));
        for (let j = 0; j < leve_2_cache[i].childNodes.length; j++) {
            section.appendChild(leve_2_cache[i].childNodes[j].cloneNode());
        }
        div.replaceChild(section, leve_2_cache[i]);
    }
    return div;
}
