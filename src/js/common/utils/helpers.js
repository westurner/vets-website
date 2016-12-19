import _ from 'lodash';
import moment from 'moment';

export function getPageList(routes) {
  return routes.map(route => {
    const obj = {
      name: route.props.path,
      label: route.props.name,
      form: route.props.form
    };
    if (route.props.depends) {
      obj.depends = route.props.depends;
    }
    return obj;
  }).filter(page => page.name !== '/submit-message');
}

export function groupPagesIntoChapters(routes) {
  const pageList = routes
    .filter(route => route.props.chapter)
    .map(page => {
      const obj = {
        name: page.props.name,
        chapter: page.props.chapter,
        path: page.props.path,
        form: page.props.form
      };

      if (page.props.depends) {
        obj.depends = page.props.depends;
      }

      return obj;
    });

  const pageGroups = _.groupBy(pageList, page => page.chapter);

  return Object.keys(pageGroups).map(chapter => {
    return {
      name: chapter,
      pages: pageGroups[chapter]
    };
  });
}
export function isActivePage(page, data) {
  if (typeof page.depends === 'function') {
    return page.depends(data);
  }

  return true;
}

export function getActivePages(pages, data) {
  return pages.filter(page => isActivePage(page, data));
}

function findNeighbor(increment, data, path, pages) {
  const filtered = getActivePages(pages, data);
  const currentIndex = filtered.map(page => page.name).indexOf(path);
  const index = currentIndex + increment;
  return filtered[index].name;
}

export function getNextPage(formData, path, pages) {
  return findNeighbor(1, formData, path, pages);
}

export function getPreviousPage(formData, path, pages) {
  return findNeighbor(-1, formData, path, pages);
}

export function dateToMoment(dateField) {
  return moment({
    year: dateField.year,
    month: dateField.month ? parseInt(dateField.month, 10) - 1 : '',
    day: dateField.day ? dateField.day : null
  });
}

export function focusElement(selectorOrElement) {
  const el = typeof selectorOrElement === 'string'
    ? document.querySelector(selectorOrElement)
    : selectorOrElement;

  if (el) {
    el.setAttribute('tabindex', '-1');
    el.focus();
  }
}
