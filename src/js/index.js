import 'normalize.css'
import '@/sass/style.sass'
import $ from 'jquery'

window.$ = window.jQuery = require('jquery')
window.isotope = require('isotope-layout/dist/isotope.pkgd')
import 'jquery-parallax.js'
import 'slick-carousel/slick/slick.min'
import 'slick-carousel/slick/slick.scss'

import products from '@/js/products'
import 'animate.css'

$(function() {
	console.log(`Что ты тут забыл странник?
							Не беспокойся, все с кодом отлично :)
							Скорей уже пиши мне
							Почта: mr.nonamerz08@yandex.ru`)
	toggleNav()
	const $container = $('.portfolio__grid')

	$container.isotope({
		itemSelector: '.portfolio__item',
		masonry: {
			columnWidth: $container.width() / 3
		},
		transitionDuration: '0.7s'
	})

	$('.portfolio__tab').click(function(e) {
		$('.portfolio__tab').removeClass('portfolio__tab_active')
		$(this).addClass('portfolio__tab_active')
		const selector = $(this).attr('data-filter')

		$('.portfolio__grid').isotope({filter: selector})
	})

	$(window).resize(function() {
		$container.isotope({
			masonry: {
				columnWidth: $container.width() / 3
			}
		})
	})
	setTimeout(() => {
		$('.portfolio__tab').eq(0).trigger('click')
		$(window).resize()
	}, 1500)

	$(window).scroll(() => {
		toggleNav()
		computeAnimation()
	})
	$('.skills__slider').slick({
		slidesToShow: 3,
		centerMode: true,
		centerPadding: 0,
		infinite: true,
		prevArrow: '<img src="images/arrow.png" class="arrow arrow_prev">',
		nextArrow: '<img src="images/arrow.png" class="arrow arrow_next">',
		autoplay: true,
		dots: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					centerMode: false,
				}
			}
		]
	})
	$('.tns-nav button').eq(0).addClass('nav-active')
	$('.scrollToId').click(function(e) {
		scrollToId(this)
	})
	$('.portfolio__item').click(function(e) {
		const work = $(this).attr('data-portfolio')
		$('html').addClass('no-scroll')
		visualWork(work)
		showModal()
	})
	$('.bg, .modal__times').click(function(e) {
		if (!$(e.target).closest('.modal').length || $(e.target).hasClass('modal__times')) {
			$('html').removeClass('no-scroll')
			$('.modal').removeClass('modal_active')
			setTimeout(() => {
				$('.bg').hide()
			}, 320)
			$('.bg').removeClass('bg_active')
			setTimeout(() => {
				$('.bg').hide()
			}, 340)
			$('#modal-image').hide()
			$('#modal-loading').show()
		}
	})
	$('.hamburger').click(function(e) {
		$(this).toggleClass('is-active')
		$('.nav__menu').toggleClass('nav__menu_active')
		$('.nav').toggleClass('nav_no-shadow')
		$('.nav').toggleClass('nav_open')
	})
})

function scrollToId(el) {
	const href = $(el).attr('data-href')
	const position = $(href).offset().top - $('.nav').innerHeight()
	$('html, body').animate({scrollTop: position + 'px'})
	$('.nav__menu').removeClass('nav__menu_active')
	$('.hamburger').removeClass('is-active')
	$('.nav').removeClass('nav_no-shadow')
	$('.nav').removeClass('nav_open')
	if ($(el).hasClass('btn')) {
		$('.main__form .input[type="name"]').focus()
	}
}

function toggleNav() {
	if ($(window).scrollTop() > toScroll()) {
		$('.nav').addClass('nav_fixed')
	} else {
		$('.nav').removeClass('nav_fixed')
	}
}

function toScroll() {
	let toScroll = $('.nav').outerHeight() - $('.nav .container').innerHeight() - 20
	if ($(window).width() < 1024) {
		toScroll = $('.nav').outerHeight()
	}
	return toScroll
}

function visualWork(work) {
	$('#modal-price').show()
	$('#modal-time').show()
	$('#modal-image').attr('src', 'images/works/' + products[work].image).on('load', () => {
		$('#modal-image').show()
		$('#modal-loading').hide()
	})
	$('#modal-name').text(products[work].name)
	$('#modal-target').html('<span>Задача: </span>' + products[work].target)
	if (products[work].price) $('#modal-price span').text(products[work].price + ' руб.')
	else $('#modal-price').hide()
	if (products[work].time) $('#modal-time span').text(products[work].time + ' дн.')
	else $('#modal-time').hide()
}

function showModal() {
	$('.bg').show()
	setTimeout(() => {
		$('.bg').addClass('bg_active')
	}, 30)
	setTimeout(() => {
		$('.modal').addClass('modal_active')
	}, 30)
}

function computeAnimation() {
	const windowHalfHeight = $(window).innerHeight() * 0.5
	const pixelsScrolled = $(window).scrollTop() + windowHalfHeight
	if (pixelsScrolled > $('#hi').offset().top && pixelsScrolled < $('#hi').offset().top + windowHalfHeight) {
		$('#hi').addClass('animate__tada')
	}
	if (pixelsScrolled * 1.1 > $('#point-down').offset().top) {
		$('#point-down').addClass('animate__shakeY')
	}
	if (pixelsScrolled > $('.technologies').offset().top) {
		$('.technologies__content').addClass('technologies__content_active')
	}
}
