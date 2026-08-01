export const navigation = [
	{
		label: "Inicio",
		href: "/",
		icon: "fa-solid fa-house",
		key: "inicio",
	},
	{
		label: "Propietarios",
		href: "/propietarios/",
		icon: "fa-solid fa-key",
		key: "propietarios",
		children: [
			{
				label: "Venta",
				href: "/propietarios/venta/",
				icon: "fa-solid fa-sign-hanging",
				key: "propietarios-venta",
			},
			{
				label: "Arriendo",
				href: "/propietarios/arriendo/",
				icon: "fa-solid fa-door-open",
				key: "propietarios-arriendo",
			},
		],
	},
	{
		label: "Arrendatarios",
		href: "/arrendatarios/",
		icon: "fa-solid fa-door-open",
		key: "arrendatarios",
	},
	{
		label: "Referidos",
		href: "/referidos/",
		icon: "fa-solid fa-handshake-angle",
		key: "referidos",
	},
];
